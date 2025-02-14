import { CountryOrIso2 } from '@/types/countries';

export default function normalizeCountryIso2(countryOrIso2?: CountryOrIso2): string {
  if (countryOrIso2 && typeof countryOrIso2 === 'object') {
    return countryOrIso2.iso2;
  }

  return (countryOrIso2 || '').toUpperCase();
}
