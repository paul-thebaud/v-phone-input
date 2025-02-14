import { getExample, ParsedPhoneNumber } from 'awesome-phonenumber';

export default function makeExample(iso2: string): ParsedPhoneNumber {
  return getExample(iso2);
}
