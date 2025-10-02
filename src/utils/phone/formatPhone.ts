import { ParsedPhoneNumber, PhoneNumberFormat } from 'awesome-phonenumber';

/**
 * Format a parsed phone number to given format.
 *
 * @param phone
 * @param format
 *
 * @deprecated
 * This public API will be removed in a next major release.
 * Use the properties you want on the `ParsedPhoneNumber` object.
 */
export default function formatPhone(phone: ParsedPhoneNumber, format: PhoneNumberFormat): string {
  return phone.number?.[format] || phone.number?.input || '';
}
