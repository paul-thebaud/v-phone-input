import { CountryIso2 } from '@/types/countries';
import { ExtendedPhoneNumber } from '@/types/phone';
import { getExample } from 'awesome-phonenumber';

export default function makeExample(iso2: CountryIso2): ExtendedPhoneNumber {
  return getExample(iso2);
}
