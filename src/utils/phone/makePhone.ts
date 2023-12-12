import { CountryIso2 } from '@/types/countries';
import { ParsedPhoneNumber, parsePhoneNumber } from 'awesome-phonenumber';

export default function makePhone(value?: string | null, iso2?: CountryIso2): ParsedPhoneNumber {
  return parsePhoneNumber((value || '').trim(), { regionCode: iso2 });
}
