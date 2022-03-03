import { CountryIso2 } from '@/types/countries';

export default function normalizeCountryIso2(iso2?: CountryIso2): CountryIso2 {
  return (iso2 || '').toUpperCase();
}
