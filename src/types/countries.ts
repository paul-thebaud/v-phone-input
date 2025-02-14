/**
 * Country ISO2 code string.
 *
 * @deprecated Use `string` instead.
 */
export type CountryIso2 = string;

/**
 * Country object.
 */
export interface Country {
  name: string;
  iso2: string;
  dialCode: string;
}

/**
 * Dictionary of country objects mapped by ISO2 code.
 */
export type CountryMap = Record<string, Country>;

/**
 * Country object or ISO2 code.
 */
export type CountryOrIso2 = Country | string;

/**
 * Object to guess a country to use inside the input.
 */
export interface CountryGuesser {
  guess: () => Promise<string | undefined>;
}

/**
 * Extended implementation of a country guesser which can store the
 * user's preference.
 */
export interface PreferableCountryGuesser extends CountryGuesser {
  setPreference: (country: string) => void;
}
