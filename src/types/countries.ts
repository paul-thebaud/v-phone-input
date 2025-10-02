/**
 * Country ISO2 code string.
 *
 * @deprecated
 * This public API will be removed in a next major release.
 * Use `string` instead.
 */
export type CountryIso2 = string;

/**
 * Country object.
 *
 * @deprecated
 * This public API will be removed in a next major release.
 */
export interface Country {
  name: string;
  iso2: string;
  dialCode: string;
}

/**
 * Dictionary of country objects mapped by ISO2 code.
 *
 * @deprecated
 * This public API will be removed in a next major release.
 */
export type CountryMap = Record<string, Country>;

/**
 * Country object or ISO2 code.
 *
 * @deprecated
 * This public API will be removed in a next major release.
 */
export type CountryOrIso2 = Country | string;

/**
 * Object to guess a country to use inside the input.
 *
 * @deprecated
 * This public API will be removed in a next major release.
 */
export interface CountryGuesser {
  guess: () => Promise<string | undefined>;
}

/**
 * Extended implementation of a country guesser which can store the
 * user's preference.
 *
 * @deprecated
 * This public API will be removed in a next major release.
 */
export interface PreferableCountryGuesser extends CountryGuesser {
  setPreference: (country: string) => void;
}
