import { PhoneNumberObject } from '@/types/phone';
import { PhoneNumberFormat } from 'awesome-phonenumber';

export default function formatPhone(phone: PhoneNumberObject, format: PhoneNumberFormat): string {
  return phone.number[format] || phone.number.input;
}
