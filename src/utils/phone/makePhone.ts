import { CountryIso2 } from '@/types/countries';
import { ExtendedPhoneNumber } from '@/types/phone';
import { parsePhoneNumber } from 'awesome-phonenumber';

export default function makePhone(value?: string | null, iso2?: CountryIso2): ExtendedPhoneNumber {
  return parsePhoneNumber((value || '').trim(), iso2);
}
