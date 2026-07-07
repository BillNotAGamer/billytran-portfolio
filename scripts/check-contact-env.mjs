import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const DEFAULT_CONTACT_TO_EMAIL = "tranbao64416@gmail.com";
const REQUIRED_KEYS = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SECURE",
  "SMTP_USER",
  "SMTP_PASS",
];
const OPTIONAL_KEYS = ["SMTP_FROM", "CONTACT_TO_EMAIL"];

function stripWrappingQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const content = fs.readFileSync(filePath, "utf8");
  const entries = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const normalizedLine = line.startsWith("export ")
      ? line.slice("export ".length)
      : line;
    const separatorIndex = normalizedLine.indexOf("=");

    if (separatorIndex <= 0) {
      continue;
    }

    const key = normalizedLine.slice(0, separatorIndex).trim();
    const value = normalizedLine.slice(separatorIndex + 1).trim();
    entries[key] = stripWrappingQuotes(value);
  }

  return entries;
}

function parseBooleanEnv(value) {
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

function buildFallbackFromAddress(user) {
  return user ? `Portfolio Contact <${user}>` : "";
}

const projectRoot = process.cwd();
const envFromFiles = {
  ...parseEnvFile(path.join(projectRoot, ".env")),
  ...parseEnvFile(path.join(projectRoot, ".env.local")),
};
const env = {
  ...envFromFiles,
  ...process.env,
};

const host = env.SMTP_HOST?.trim();
const portValue = env.SMTP_PORT?.trim();
const secureValue = env.SMTP_SECURE?.trim();
const secure = parseBooleanEnv(secureValue);
const user = env.SMTP_USER?.trim();
const pass = env.SMTP_PASS?.trim();
const from = env.SMTP_FROM?.trim() || buildFallbackFromAddress(user);

const missing = [];
const invalid = [];
const optionalFallbacks = [];

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

if (portValue) {
  const port = Number(portValue);

  if (!Number.isInteger(port) || port <= 0) {
    invalid.push("SMTP_PORT");
  }
}

if (secureValue && secure === null) {
  invalid.push("SMTP_SECURE");
}

if (!env.SMTP_FROM?.trim() && from) {
  optionalFallbacks.push("SMTP_FROM -> Portfolio Contact <SMTP_USER>");
}

if (!env.CONTACT_TO_EMAIL?.trim()) {
  optionalFallbacks.push(
    `CONTACT_TO_EMAIL -> ${DEFAULT_CONTACT_TO_EMAIL}`,
  );
}

console.log("Checking contact form SMTP configuration...");

if (fs.existsSync(path.join(projectRoot, ".env.local"))) {
  console.log("Loaded .env.local for this check.");
} else {
  console.log(
    ".env.local was not found. Next.js loads .env.local automatically at runtime when the file exists.",
  );
}

console.log("");
console.log("Required variables:");
for (const key of REQUIRED_KEYS) {
  console.log(`- ${key}: ${env[key]?.trim() ? "present" : "missing"}`);
}

console.log("");
console.log("Optional variables:");
for (const key of OPTIONAL_KEYS) {
  console.log(`- ${key}: ${env[key]?.trim() ? "present" : "missing"}`);
}

if (optionalFallbacks.length > 0) {
  console.log("");
  console.log("Safe fallbacks:");
  for (const fallback of optionalFallbacks) {
    console.log(`- ${fallback}`);
  }
}

console.log("");
console.log(
  "If you are using Gmail SMTP, SMTP_PASS must be a Gmail App Password.",
);

if (missing.length > 0 || invalid.length > 0) {
  console.error("");
  console.error("Contact form SMTP configuration is incomplete.");

  if (missing.length > 0) {
    console.error(`Missing: ${missing.join(", ")}`);
  }

  if (invalid.length > 0) {
    console.error(`Invalid: ${invalid.join(", ")}`);
    console.error("SMTP_PORT must be a positive integer. SMTP_SECURE must be true/false, 1/0, or yes/no.");
  }

  process.exitCode = 1;
} else {
  console.log("");
  console.log("Contact form SMTP configuration looks complete.");
  process.exitCode = 0;
}
