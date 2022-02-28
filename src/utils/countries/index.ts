import { Country } from '@/types/countries';
import countriesData from '@/utils/countries/data';

export default (countriesData as string[][]).map(([name, iso2, dialCode]) => ({
  name,
  iso2: iso2.toUpperCase(),
  dialCode,
})) as Country[];
