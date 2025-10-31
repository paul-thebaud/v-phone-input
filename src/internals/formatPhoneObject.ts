import type { ParsedPhoneNumber, PhoneNumberFormat } from "awesome-phonenumber";

export default function formatPhoneObject(
  format: PhoneNumberFormat | null | undefined,
  phone: ParsedPhoneNumber,
) {
  return phone.number?.[format ?? "input"] ?? phone.number?.input ?? "";
}
