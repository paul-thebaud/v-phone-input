import { ParsedPhoneNumber, parsePhoneNumber } from 'awesome-phonenumber';

/**
 * Make a phone number from a raw input and a country ISO2 code.
 *
 * @param value
 * @param iso2
 *
 * @deprecated
 * This public API will be removed in a next major release.
 * Use `awesome-phonenumber` package's `parsePhoneNumber()` function.
 */
export default function makePhone(value?: string | null, iso2?: string): ParsedPhoneNumber {
  return parsePhoneNumber((value || '').trim(), { regionCode: iso2 });
}
