"use server";

export type InvestorErrorCode =
  | "firstName"
  | "lastName"
  | "middleName"
  | "contactRequired"
  | "emailInvalid"
  | "phoneInvalid";

export type InvestorFormState = {
  ok: boolean;
  messageCode?: "checkFields" | "success";
  errors?: Partial<Record<"firstName" | "lastName" | "middleName" | "contact", InvestorErrorCode>>;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^\+?[\d\s().-]{7,20}$/;

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitInvestorApplication(
  _prev: InvestorFormState,
  formData: FormData,
): Promise<InvestorFormState> {
  const firstName = readField(formData, "firstName");
  const lastName = readField(formData, "lastName");
  const middleName = readField(formData, "middleName");
  const email = readField(formData, "email");
  const phone = readField(formData, "phone");

  const errors: InvestorFormState["errors"] = {};

  if (!firstName) errors.firstName = "firstName";
  if (!lastName) errors.lastName = "lastName";
  if (!middleName) errors.middleName = "middleName";

  const hasEmail = Boolean(email);
  const hasPhone = Boolean(phone);

  if (!hasEmail && !hasPhone) {
    errors.contact = "contactRequired";
  } else {
    if (hasEmail && !emailRe.test(email)) {
      errors.contact = "emailInvalid";
    }
    if (hasPhone && !phoneRe.test(phone)) {
      errors.contact = errors.contact ?? "phoneInvalid";
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      messageCode: "checkFields",
      errors,
    };
  }

  // TODO: подключить бэкенд / CRM / email
  console.info("[investor-application]", {
    firstName,
    lastName,
    middleName,
    email: email || null,
    phone: phone || null,
    at: new Date().toISOString(),
  });

  return {
    ok: true,
    messageCode: "success",
  };
}
