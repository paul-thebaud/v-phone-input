import { ParsedPhoneNumber, PhoneNumberFormat } from 'awesome-phonenumber';

export default function formatPhone(phone: ParsedPhoneNumber, format: PhoneNumberFormat): string {
  return phone.number?.[format] || phone.number?.input || '';
}
