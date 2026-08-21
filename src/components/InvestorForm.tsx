"use client";

import { useActionState } from "react";
import {
  submitInvestorApplication,
  type InvestorErrorCode,
  type InvestorFormState,
} from "@/app/actions/investor";
import { useTranslations } from "@/i18n/client";

const initialState: InvestorFormState = {
  ok: false,
};

const errorKeyMap: Record<InvestorErrorCode, `form.errors.${InvestorErrorCode}`> = {
  firstName: "form.errors.firstName",
  lastName: "form.errors.lastName",
  middleName: "form.errors.middleName",
  contactRequired: "form.errors.contactRequired",
  emailInvalid: "form.errors.emailInvalid",
  phoneInvalid: "form.errors.phoneInvalid",
};

export function InvestorForm() {
  const t = useTranslations();
  const [state, action, pending] = useActionState(
    submitInvestorApplication,
    initialState,
  );

  if (state.ok) {
    return (
      <div className="border border-ok/40 bg-ok/10 px-5 py-6 font-mono">
        <p className="text-sm text-fg">{t("form.success")}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field
          label={t("form.firstName")}
          name="firstName"
          autoComplete="given-name"
          error={
            state.errors?.firstName
              ? t(errorKeyMap[state.errors.firstName])
              : undefined
          }
          required
        />
        <Field
          label={t("form.lastName")}
          name="lastName"
          autoComplete="family-name"
          error={
            state.errors?.lastName
              ? t(errorKeyMap[state.errors.lastName])
              : undefined
          }
          required
        />
        <Field
          label={t("form.middleName")}
          name="middleName"
          autoComplete="additional-name"
          error={
            state.errors?.middleName
              ? t(errorKeyMap[state.errors.middleName])
              : undefined
          }
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={t("form.email")}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
        />
        <Field
          label={t("form.phone")}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+7 900 000-00-00"
        />
      </div>

      <p className="font-mono text-[11px] text-muted">{t("form.emailOrPhone")}</p>

      {state.errors?.contact ? (
        <p className="font-mono text-xs text-red-400" role="alert">
          {t(errorKeyMap[state.errors.contact])}
        </p>
      ) : null}

      {state.messageCode === "checkFields" ? (
        <p className="font-mono text-xs text-red-400" role="alert">
          {t("form.checkFields")}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="btn-tech w-full font-mono text-[12px] disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      >
        <span>{pending ? t("form.submitting") : t("form.submit")}</span>
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  placeholder,
  error,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        className="investor-input w-full border border-line bg-black/25 px-3 py-2.5 font-mono text-sm text-fg outline-none transition-[border-color,box-shadow] placeholder:text-muted/50 focus:border-accent focus:shadow-[0_0_0_3px_rgba(59,130,255,0.15)]"
      />
      {error ? (
        <span className="mt-1 block font-mono text-[11px] text-red-400">
          {error}
        </span>
      ) : null}
    </label>
  );
}
