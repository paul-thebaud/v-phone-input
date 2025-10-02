import { CountryGuesser, PreferableCountryGuesser } from '@/types/countries';

/**
 * @deprecated
 * This public API will be removed in a next major release.
 */
export default function isPreferableCountryGuesser(
  countryGuesser: CountryGuesser,
): countryGuesser is PreferableCountryGuesser {
  return 'setPreference' in countryGuesser;
}
