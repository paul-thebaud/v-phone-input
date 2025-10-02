import { getExample, ParsedPhoneNumber } from 'awesome-phonenumber';

/**
 * Get an example of a phone number for a country.
 *
 * @param iso2
 *
 * @deprecated
 * This public API will be removed in a next major release.
 * Use `awesome-phonenumber` package's `getExample()` function.
 */
export default function makeExample(iso2: string): ParsedPhoneNumber {
  return getExample(iso2);
}
