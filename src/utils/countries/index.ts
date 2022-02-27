import countriesData from '@/utils/countries/data';
import { Country } from '@/utils/countries/types';

export default (countriesData as string[][]).map(([name, iso2, dialCode]) => ({
  name,
  iso2: iso2.toUpperCase(),
  dialCode,
})) as Country[];
