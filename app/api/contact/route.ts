import nodemailer from "nodemailer";
import { getPortfolioData, type Locale } from "@/data/portfolio";
import { validateContactFormSubmission } from "@/lib/contact-form";

export const runtime = "nodejs";

type ContactApiResponse = {
  ok: boolean;
  message: string;
};

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
};

type SmtpConfigResolution = {
  config: SmtpConfig | null;
  missing: string[];
  invalid: string[];
};

const DEFAULT_CONTACT_TO_EMAIL = "tranbao64416@gmail.com";

function getLocalizedResponse(locale: Locale) {
  return getPortfolioData(locale).contact.form;
}

function jsonResponse(body: ContactApiResponse, status: number) {
  return Response.json(body, { status });
}

function parseBooleanEnv(value: string | undefined) {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === "true" || normalized === "1" || normalized === "yes") {
    return true;
  }

  if (normalized === "false" || normalized === "0" || normalized === "no") {
    return false;
  }

  return null;
}

function buildFallbackFromAddress(user: string) {
  return `Portfolio Contact <${user}>`;
}

function resolveSmtpConfig(): SmtpConfigResolution {
  const host = process.env.SMTP_HOST?.trim();
  const portValue = process.env.SMTP_PORT?.trim();
  const secureValue = process.env.SMTP_SECURE?.trim();
  const secure = parseBooleanEnv(secureValue);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from =
    process.env.SMTP_FROM?.trim() ||
    (user ? buildFallbackFromAddress(user) : "");
  const to = process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_CONTACT_TO_EMAIL;
  const missing: string[] = [];
  const invalid: string[] = [];

  if (!host) {
    missing.push("SMTP_HOST");
  }

  if (!portValue) {
    missing.push("SMTP_PORT");
  }

  if (!secureValue) {
    missing.push("SMTP_SECURE");
  }

  if (!user) {
    missing.push("SMTP_USER");
  }

  if (!pass) {
    missing.push("SMTP_PASS");
  }

  const port = Number(portValue);

  if (portValue && (!Number.isInteger(port) || port <= 0)) {
    invalid.push("SMTP_PORT");
  }

  if (secureValue && secure === null) {
    invalid.push("SMTP_SECURE");
  }

  if (missing.length > 0 || invalid.length > 0) {
    return {
      config: null,
      missing,
      invalid,
    };
  }

  return {
    config: {
      host: host!,
      port,
      secure: secure!,
      user: user!,
      pass: pass!,
      from,
      to,
    },
    missing,
    invalid,
  };
}

function logSmtpConfigurationIssue({
  missing,
  invalid,
}: Omit<SmtpConfigResolution, "config">) {
  if (process.env.NODE_ENV === "production") {
    console.error("Contact form SMTP configuration is incomplete.");
    return;
  }

  const diagnostics = ["Contact form SMTP configuration is incomplete."];

  if (missing.length > 0) {
    diagnostics.push(`Missing: ${missing.join(", ")}`);
  }

  if (invalid.length > 0) {
    diagnostics.push(`Invalid: ${invalid.join(", ")}`);
  }

  console.error(diagnostics.join(" "));
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildOptionalTextLine(label: string, value: string) {
  return value ? `${label}: ${value}` : `${label}: Not provided`;
}

function buildOptionalHtmlRow(label: string, value: string) {
  const resolvedValue = value ? escapeHtml(value) : "<em>Not provided</em>";

  return `<tr>
    <td style="padding:10px 14px;border:1px solid #d8e1ef;background:#f7f9fc;font-weight:600;">${escapeHtml(label)}</td>
    <td style="padding:10px 14px;border:1px solid #d8e1ef;background:#ffffff;">${resolvedValue}</td>
  </tr>`;
}

function getLocaleLabel(locale: Locale) {
  return locale === "vi" ? "Vietnamese (/vi)" : "English (/en)";
}

export async function POST(request: Request) {
  let rawBody: unknown;

  try {
    rawBody = await request.json();
  } catch {
    const response = getLocalizedResponse("en");
    return jsonResponse(
      {
        ok: false,
        message: response.validationMessage,
      },
      400,
    );
  }

  const validation = validateContactFormSubmission(rawBody);
  const responseCopy = getLocalizedResponse(validation.data.locale);

  if (validation.isBot) {
    return jsonResponse(
      {
        ok: true,
        message: responseCopy.successMessage,
      },
      200,
    );
  }

  if (validation.hasErrors) {
    return jsonResponse(
      {
        ok: false,
        message: responseCopy.validationMessage,
      },
      400,
    );
  }

  const smtpConfigResolution = resolveSmtpConfig();

  if (!smtpConfigResolution.config) {
    logSmtpConfigurationIssue(smtpConfigResolution);
    return jsonResponse(
      {
        ok: false,
        message: responseCopy.errorMessage,
      },
      500,
    );
  }

  const { data } = validation;
  const smtpConfig = smtpConfigResolution.config;
  const submittedAt = new Date().toISOString();
  const localeLabel = getLocaleLabel(data.locale);
  const subject = `[Portfolio Contact] New inquiry from ${data.name}`;

  const text = [
    "Portfolio contact form submission",
    "",
    `Submitted: ${submittedAt}`,
    `Locale: ${localeLabel}`,
    "Source: Portfolio contact form",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    buildOptionalTextLine("Company", data.company),
    buildOptionalTextLine("Inquiry type", data.inquiryType),
    buildOptionalTextLine("Budget", data.budget),
    "",
    "Message:",
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f1f5f9;padding:24px;color:#0f172a;">
      <div style="margin:0 auto;max-width:720px;border-radius:20px;overflow:hidden;background:#ffffff;border:1px solid #d8e1ef;">
        <div style="padding:24px 28px;background:linear-gradient(135deg,#8de0ff,#79a1ff,#dcb47b);color:#0f172a;">
          <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;">Portfolio Contact</p>
          <h1 style="margin:0;font-size:28px;line-height:1.2;">New inquiry from ${escapeHtml(data.name)}</h1>
        </div>
        <div style="padding:28px;">
          <table style="width:100%;border-collapse:collapse;border-spacing:0;">
            <tr>
              <td style="padding:10px 14px;border:1px solid #d8e1ef;background:#f7f9fc;font-weight:600;">Submitted</td>
              <td style="padding:10px 14px;border:1px solid #d8e1ef;background:#ffffff;">${escapeHtml(submittedAt)}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;border:1px solid #d8e1ef;background:#f7f9fc;font-weight:600;">Locale</td>
              <td style="padding:10px 14px;border:1px solid #d8e1ef;background:#ffffff;">${escapeHtml(localeLabel)}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;border:1px solid #d8e1ef;background:#f7f9fc;font-weight:600;">Source</td>
              <td style="padding:10px 14px;border:1px solid #d8e1ef;background:#ffffff;">Portfolio contact form</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;border:1px solid #d8e1ef;background:#f7f9fc;font-weight:600;">Name</td>
              <td style="padding:10px 14px;border:1px solid #d8e1ef;background:#ffffff;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;border:1px solid #d8e1ef;background:#f7f9fc;font-weight:600;">Email</td>
              <td style="padding:10px 14px;border:1px solid #d8e1ef;background:#ffffff;">${escapeHtml(data.email)}</td>
            </tr>
            ${buildOptionalHtmlRow("Company", data.company)}
            ${buildOptionalHtmlRow("Inquiry type", data.inquiryType)}
            ${buildOptionalHtmlRow("Budget", data.budget)}
          </table>

          <div style="margin-top:24px;">
            <h2 style="margin:0 0 12px;font-size:18px;">Message</h2>
            <div style="border-radius:16px;border:1px solid #d8e1ef;background:#0f172a;padding:18px;color:#e2e8f0;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass,
      },
    });

    await transporter.sendMail({
      from: smtpConfig.from,
      to: smtpConfig.to,
      replyTo: data.email,
      subject,
      text,
      html,
    });

    return jsonResponse(
      {
        ok: true,
        message: responseCopy.successMessage,
      },
      200,
    );
  } catch (error) {
    console.error("Contact form email send failed.", {
      errorName: error instanceof Error ? error.name : "UnknownError",
      locale: data.locale,
    });

    return jsonResponse(
      {
        ok: false,
        message: responseCopy.errorMessage,
      },
      500,
    );
  }
}
