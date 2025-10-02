import { CountryOrIso2 } from '@/types/countries';

/**
 * Normalize a country or ISO2 code to an ISO2 uppercase code.
 *
 * @param countryOrIso2
 */
export default function normalizeCountryIso2(countryOrIso2?: CountryOrIso2): string {
  if (countryOrIso2 && typeof countryOrIso2 === 'object') {
    return countryOrIso2.iso2;
  }

  return (countryOrIso2 || '').toUpperCase();
}
