"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useId,
  useRef,
  useState,
} from "react";
import type { Locale, PortfolioData } from "@/data/portfolio";
import {
  CONTACT_FORM_LIMITS,
  type ContactFormErrorCode,
  type ContactFormErrors,
  type ContactFormField,
  validateContactFormSubmission,
} from "@/lib/contact-form";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  copy: PortfolioData["contact"]["form"];
  locale: Locale;
};

type ContactFormValues = {
  name: string;
  email: string;
  company: string;
  inquiryType: string;
  budget: string;
  message: string;
  website: string;
};

type FormStatus =
  | { tone: "idle"; message: string }
  | { tone: "success"; message: string }
  | { tone: "error"; message: string };

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  inquiryType: "",
  budget: "",
  message: "",
  website: "",
};

function getFieldErrorMessage(
  copy: PortfolioData["contact"]["form"],
  field: ContactFormField,
  errorCode?: ContactFormErrorCode,
) {
  if (!errorCode) {
    return undefined;
  }

  if (errorCode === "tooLong") {
    return copy.fieldErrors.fieldTooLong;
  }

  if (field === "name" && errorCode === "required") {
    return copy.fieldErrors.nameRequired;
  }

  if (field === "email" && errorCode === "required") {
    return copy.fieldErrors.emailRequired;
  }

  if (field === "email" && errorCode === "invalidEmail") {
    return copy.fieldErrors.emailInvalid;
  }

  if (field === "message" && errorCode === "required") {
    return copy.fieldErrors.messageRequired;
  }

  if (field === "message" && errorCode === "tooShort") {
    return copy.fieldErrors.messageTooShort;
  }

  return copy.validationMessage;
}

const fieldClassName =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none transition-[border-color,background,box-shadow] duration-300 placeholder:text-muted focus:border-accent/55 focus:bg-white/[0.06] focus:shadow-[0_0_0_1px_rgba(141,224,255,0.18)] disabled:cursor-not-allowed disabled:opacity-70";

export function ContactForm({ copy, locale }: ContactFormProps) {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>({
    tone: "idle",
    message: "",
  });

  const updateValue =
    (field: keyof ContactFormValues) =>
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      const nextValue = event.target.value;

      setValues((currentValues) => ({
        ...currentValues,
        [field]: nextValue,
      }));

      if (field !== "website" && errors[field]) {
        setErrors((currentErrors) => {
          const nextErrors = { ...currentErrors };
          delete nextErrors[field];
          return nextErrors;
        });
      }

      if (status.tone !== "idle") {
        setStatus({ tone: "idle", message: "" });
      }
    };

  const focusFirstInvalidField = () => {
    requestAnimationFrame(() => {
      formRef.current
        ?.querySelector<HTMLElement>("[aria-invalid='true']")
        ?.focus();
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ tone: "idle", message: "" });

    const payload = {
      ...values,
      locale,
    };

    const validation = validateContactFormSubmission(payload);

    if (validation.hasErrors) {
      setErrors(validation.errors);
      setStatus({
        tone: "error",
        message: copy.validationMessage,
      });
      setIsSubmitting(false);
      focusFirstInvalidField();
      return;
    }

    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!response.ok || !result?.ok) {
        setStatus({
          tone: "error",
          message:
            result?.message ??
            (response.status === 400
              ? copy.validationMessage
              : copy.errorMessage),
        });
        return;
      }

      setValues(initialValues);
      setStatus({
        tone: "success",
        message: result.message ?? copy.successMessage,
      });
    } catch {
      setStatus({
        tone: "error",
        message: copy.errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const companyId = `${formId}-company`;
  const inquiryTypeId = `${formId}-inquiry-type`;
  const budgetId = `${formId}-budget`;
  const messageId = `${formId}-message`;
  const websiteId = `${formId}-website`;

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-white/8 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.9)] sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-accent/80">
            {copy.eyebrow}
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
            {copy.title}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted-strong">
            {copy.description}
          </p>
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          {copy.requiredHint}
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor={nameId}
            className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted"
          >
            {copy.nameLabel} <span className="text-accent">*</span>
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={CONTACT_FORM_LIMITS.name}
            required
            disabled={isSubmitting}
            value={values.name}
            onChange={updateValue("name")}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            className={cn(
              fieldClassName,
              errors.name && "border-rose-400/70 bg-rose-500/8",
            )}
            placeholder={copy.namePlaceholder}
          />
          {errors.name ? (
            <p id={`${nameId}-error`} className="text-sm text-rose-200">
              {getFieldErrorMessage(copy, "name", errors.name)}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            htmlFor={emailId}
            className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted"
          >
            {copy.emailLabel} <span className="text-accent">*</span>
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={CONTACT_FORM_LIMITS.email}
            required
            disabled={isSubmitting}
            value={values.email}
            onChange={updateValue("email")}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            className={cn(
              fieldClassName,
              errors.email && "border-rose-400/70 bg-rose-500/8",
            )}
            placeholder={copy.emailPlaceholder}
          />
          {errors.email ? (
            <p id={`${emailId}-error`} className="text-sm text-rose-200">
              {getFieldErrorMessage(copy, "email", errors.email)}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            htmlFor={companyId}
            className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted"
          >
            {copy.companyLabel}
            <span className="ml-2 text-[11px] font-medium tracking-[0.12em] text-muted/80">
              {copy.optionalLabel}
            </span>
          </label>
          <input
            id={companyId}
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={CONTACT_FORM_LIMITS.company}
            disabled={isSubmitting}
            value={values.company}
            onChange={updateValue("company")}
            aria-invalid={errors.company ? "true" : "false"}
            aria-describedby={errors.company ? `${companyId}-error` : undefined}
            className={cn(
              fieldClassName,
              errors.company && "border-rose-400/70 bg-rose-500/8",
            )}
            placeholder={copy.companyPlaceholder}
          />
          {errors.company ? (
            <p id={`${companyId}-error`} className="text-sm text-rose-200">
              {getFieldErrorMessage(copy, "company", errors.company)}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            htmlFor={inquiryTypeId}
            className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted"
          >
            {copy.inquiryTypeLabel}
            <span className="ml-2 text-[11px] font-medium tracking-[0.12em] text-muted/80">
              {copy.optionalLabel}
            </span>
          </label>
          <select
            id={inquiryTypeId}
            name="inquiryType"
            disabled={isSubmitting}
            value={values.inquiryType}
            onChange={updateValue("inquiryType")}
            aria-invalid={errors.inquiryType ? "true" : "false"}
            aria-describedby={
              errors.inquiryType ? `${inquiryTypeId}-error` : undefined
            }
            className={cn(
              fieldClassName,
              "appearance-none",
              !values.inquiryType && "text-muted",
              errors.inquiryType && "border-rose-400/70 bg-rose-500/8",
            )}
          >
            <option value="">{copy.inquiryTypePlaceholder}</option>
            {copy.inquiryTypes.map((option) => (
              <option key={option} value={option} className="bg-slate-950 text-foreground">
                {option}
              </option>
            ))}
          </select>
          {errors.inquiryType ? (
            <p id={`${inquiryTypeId}-error`} className="text-sm text-rose-200">
              {getFieldErrorMessage(copy, "inquiryType", errors.inquiryType)}
            </p>
          ) : null}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label
            htmlFor={budgetId}
            className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted"
          >
            {copy.budgetLabel}
            <span className="ml-2 text-[11px] font-medium tracking-[0.12em] text-muted/80">
              {copy.optionalLabel}
            </span>
          </label>
          <select
            id={budgetId}
            name="budget"
            disabled={isSubmitting}
            value={values.budget}
            onChange={updateValue("budget")}
            aria-invalid={errors.budget ? "true" : "false"}
            aria-describedby={errors.budget ? `${budgetId}-error` : undefined}
            className={cn(
              fieldClassName,
              "appearance-none",
              !values.budget && "text-muted",
              errors.budget && "border-rose-400/70 bg-rose-500/8",
            )}
          >
            <option value="">{copy.budgetPlaceholder}</option>
            {copy.budgetOptions.map((option) => (
              <option key={option} value={option} className="bg-slate-950 text-foreground">
                {option}
              </option>
            ))}
          </select>
          {errors.budget ? (
            <p id={`${budgetId}-error`} className="text-sm text-rose-200">
              {getFieldErrorMessage(copy, "budget", errors.budget)}
            </p>
          ) : null}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label
            htmlFor={messageId}
            className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted"
          >
            {copy.messageLabel} <span className="text-accent">*</span>
          </label>
          <textarea
            id={messageId}
            name="message"
            rows={6}
            required
            minLength={CONTACT_FORM_LIMITS.messageMinLength}
            maxLength={CONTACT_FORM_LIMITS.message}
            disabled={isSubmitting}
            value={values.message}
            onChange={updateValue("message")}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? `${messageId}-error` : undefined}
            className={cn(
              fieldClassName,
              "min-h-40 resize-y",
              errors.message && "border-rose-400/70 bg-rose-500/8",
            )}
            placeholder={copy.messagePlaceholder}
          />
          {errors.message ? (
            <p id={`${messageId}-error`} className="text-sm text-rose-200">
              {getFieldErrorMessage(copy, "message", errors.message)}
            </p>
          ) : null}
        </div>
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor={websiteId}>Website</label>
        <input
          id={websiteId}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={updateValue("website")}
        />
      </div>

      <div className="mt-6 space-y-4">
        {status.tone !== "idle" ? (
          <p
            className={cn(
              "rounded-2xl border px-4 py-3 text-sm leading-6",
              status.tone === "success"
                ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
                : "border-rose-400/30 bg-rose-500/10 text-rose-100",
            )}
            role={status.tone === "error" ? "alert" : "status"}
          >
            {status.message}
          </p>
        ) : null}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-transparent bg-[linear-gradient(135deg,rgba(141,224,255,0.98),rgba(121,161,255,0.92),rgba(220,180,123,0.9))] px-6 py-3 text-sm font-semibold tracking-[0.02em] text-slate-950 shadow-[0_28px_60px_-26px_rgba(121,161,255,0.55)] transition-[transform,box-shadow,opacity] duration-300 hover:-translate-y-0.5 hover:shadow-[0_34px_70px_-24px_rgba(121,161,255,0.48)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? copy.submittingLabel : copy.submitLabel}
          </button>

          <p className="max-w-md text-sm leading-7 text-muted-strong">
            {copy.privacyNote}
          </p>
        </div>
      </div>
    </form>
  );
}
