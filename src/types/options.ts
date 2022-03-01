import { Country, CountryGuesser, CountryIso2 } from '@/types/countries';
import { PhoneNumberFormat } from '@/types/phone';
import { VueConstructor } from 'vue';

export type CountryIconMode = 'svg' | 'sprite' | VueConstructor | undefined;

export type Message = string | undefined | null;

export interface MessageOptions {
  label?: Message;
  example: string;
}

export type MessageResolver = ((options: MessageOptions) => Message) | Message;

export interface PluginOptions {
  label: MessageResolver;
  ariaLabel: MessageResolver;
  countryLabel: MessageResolver;
  countryAriaLabel: MessageResolver;
  placeholder: MessageResolver;
  hint: MessageResolver;
  invalidMessage: MessageResolver;
  persistentPlaceholder: boolean | undefined;
  persistentHint: boolean | undefined;
  countryIconMode: CountryIconMode;
  allCountries: Country[];
  preferredCountries: CountryIso2[];
  onlyCountries: CountryIso2[];
  ignoreCountries: CountryIso2[];
  defaultCountry: CountryIso2 | undefined;
  countryGuesser: CountryGuesser;
  disableGuessingCountry: boolean;
  disableGuessLoading: boolean;
  enableSearchingCountry: boolean;
  displayFormat: PhoneNumberFormat;
}
