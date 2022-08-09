import { CountryIso2, CountryOrIso2 } from '@/types/countries';

export default function normalizeCountryIso2(countryOrIso2?: CountryOrIso2): CountryIso2 {
  if (countryOrIso2 && typeof countryOrIso2 === 'object') {
    return countryOrIso2.iso2;
  }

  return (countryOrIso2 || '').toUpperCase();
}
