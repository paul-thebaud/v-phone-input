import { ParsedPhoneNumber, parsePhoneNumber } from 'awesome-phonenumber';

export default function makePhone(value?: string | null, iso2?: string): ParsedPhoneNumber {
  return parsePhoneNumber((value || '').trim(), { regionCode: iso2 });
}
