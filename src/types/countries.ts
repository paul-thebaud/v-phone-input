export type CountryIso2 = string;

export interface Country {
  name: string;
  iso2: CountryIso2;
  dialCode: string;
}

export interface CountryGuesser {
  guess: () => Promise<CountryIso2 | undefined>;
}
