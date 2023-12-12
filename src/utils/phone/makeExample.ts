import { CountryIso2 } from '@/types/countries';
import { getExample, ParsedPhoneNumber } from 'awesome-phonenumber';

export default function makeExample(iso2: CountryIso2): ParsedPhoneNumber {
  return getExample(iso2);
}
