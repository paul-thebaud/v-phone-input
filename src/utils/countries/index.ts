import { Country } from '@/types/countries';
import normalizeCountryIso2 from '@/utils/countries/normalizeCountryIso2';
import { allCountries } from 'country-telephone-data';

export default allCountries.map((country) => ({
  ...country,
  iso2: normalizeCountryIso2(country.iso2),
})) as Country[];
