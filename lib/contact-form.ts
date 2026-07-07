import type { Locale } from "@/data/portfolio";

export const CONTACT_FORM_LIMITS = {
  name: 100,
  email: 200,
  company: 150,
  inquiryType: 100,
  budget: 100,
  message: 3000,
  messageMinLength: 20,
} as const;

export type ContactFormField =
  | "name"
  | "email"
  | "company"
  | "inquiryType"
  | "budget"
  | "message";

export type ContactFormErrorCode =
  | "required"
  | "invalidEmail"
  | "tooLong"
  | "tooShort";

export type ContactFormErrors = Partial<
  Record<ContactFormField, ContactFormErrorCode>
>;

export type ContactFormSubmission = {
  name: string;
  email: string;
  company?: string;
  inquiryType?: string;
  budget?: string;
  message: string;
  locale?: Locale;
  website?: string;
};

export type ValidatedContactFormSubmission = {
  name: string;
  email: string;
  company: string;
  inquiryType: string;
  budget: string;
  message: string;
  locale: Locale;
  website: string;
};

type ValidationResult = {
  data: ValidatedContactFormSubmission;
  errors: ContactFormErrors;
  hasErrors: boolean;
  isBot: boolean;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "vi";
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : {};
}

function normalizeSingleLine(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/[\r\n]+/g, " ").trim();
}

function normalizeMessage(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\r\n?/g, "\n").trim();
}

function exceedsMaxLength(value: string, maxLength: number) {
  return value.length > maxLength;
}

export function validateContactFormSubmission(input: unknown): ValidationResult {
  const raw = asRecord(input);

  const data: ValidatedContactFormSubmission = {
    name: normalizeSingleLine(raw.name),
    email: normalizeSingleLine(raw.email).toLowerCase(),
    company: normalizeSingleLine(raw.company),
    inquiryType: normalizeSingleLine(raw.inquiryType),
    budget: normalizeSingleLine(raw.budget),
    message: normalizeMessage(raw.message),
    locale: isLocale(raw.locale) ? raw.locale : "en",
    website: normalizeSingleLine(raw.website),
  };

  const errors: ContactFormErrors = {};

  if (!data.name) {
    errors.name = "required";
  } else if (exceedsMaxLength(data.name, CONTACT_FORM_LIMITS.name)) {
    errors.name = "tooLong";
  }

  if (!data.email) {
    errors.email = "required";
  } else if (exceedsMaxLength(data.email, CONTACT_FORM_LIMITS.email)) {
    errors.email = "tooLong";
  } else if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = "invalidEmail";
  }

  if (
    data.company &&
    exceedsMaxLength(data.company, CONTACT_FORM_LIMITS.company)
  ) {
    errors.company = "tooLong";
  }

  if (
    data.inquiryType &&
    exceedsMaxLength(data.inquiryType, CONTACT_FORM_LIMITS.inquiryType)
  ) {
    errors.inquiryType = "tooLong";
  }

  if (data.budget && exceedsMaxLength(data.budget, CONTACT_FORM_LIMITS.budget)) {
    errors.budget = "tooLong";
  }

  if (!data.message) {
    errors.message = "required";
  } else if (exceedsMaxLength(data.message, CONTACT_FORM_LIMITS.message)) {
    errors.message = "tooLong";
  } else if (data.message.length < CONTACT_FORM_LIMITS.messageMinLength) {
    errors.message = "tooShort";
  }

  return {
    data,
    errors,
    hasErrors: Object.keys(errors).length > 0,
    isBot: data.website.length > 0,
  };
}
