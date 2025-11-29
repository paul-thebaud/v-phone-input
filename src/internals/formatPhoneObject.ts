import type { ParsedPhoneNumber, PhoneNumberFormat } from "awesome-phonenumber";

/**
 * Format an optional phone number.
 *
 * @param format
 * @param phone
 *
 * @internal
 */
export default function formatPhoneObject(
  format: PhoneNumberFormat | null | undefined,
  phone: ParsedPhoneNumber,
) {
  return phone.number?.[format ?? "input"] ?? phone.number?.input ?? "";
}
