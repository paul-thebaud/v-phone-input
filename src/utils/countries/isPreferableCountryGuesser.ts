import { CountryGuesser, PreferableCountryGuesser } from '@/types/countries';

export default function isPreferableCountryGuesser(
  countryGuesser: CountryGuesser,
): countryGuesser is PreferableCountryGuesser {
  return 'setPreference' in countryGuesser;
}
