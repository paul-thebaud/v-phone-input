import { Country, CountryGuesser } from '@/types/countries';
import { ParsedPhoneNumber, PhoneNumberFormat } from 'awesome-phonenumber';
import { DefineComponent } from 'vue';

/**
 * @deprecated
 * This public API will be removed in a next major release.
 */
export type CountryIconMode = 'svg' | 'sprite' | 'text' | DefineComponent | undefined;

/**
 * @deprecated
 * This public API will be removed in a next major release.
 */
export type CountryPhoneExample = string | ((country: Country) => string);

/**
 * @deprecated
 * This public API will be removed in a next major release.
 */
export type Message = string | undefined;

/**
 * @deprecated
 * This public API will be removed in a next major release.
 */
export interface MessageOptions {
  label?: Message;
  country: Country;
  example: string;
}

/**
 * @deprecated
 * This public API will be removed in a next major release.
 */
export type MessageResolver = ((options: MessageOptions) => Message) | Message;

/**
 * @deprecated
 * This public API will be removed in a next major release.
 */
export type PhoneValidator = (phone: ParsedPhoneNumber) => boolean;

/**
 * @deprecated
 * This public API will be removed in a next major release.
 */
export interface PluginOptions {
  label: MessageResolver;
  ariaLabel: MessageResolver;
  countryLabel: MessageResolver;
  countryAriaLabel: MessageResolver;
  placeholder: MessageResolver;
  hint: MessageResolver;
  invalidMessage: MessageResolver;
  example: CountryPhoneExample | undefined;
  persistentPlaceholder: boolean | undefined;
  persistentHint: boolean | undefined;
  countryIconMode: CountryIconMode;
  allCountries: Country[];
  preferCountries: string[];
  includeCountries: string[];
  excludeCountries: string[];
  defaultCountry: string | undefined;
  /**
   * @deprecated
   * This public API will be replaced in a next major release.
   */
  displayFormat: PhoneNumberFormat;
  /**
   * @deprecated
   * This public API will be replaced in a next major release.
   */
  enableSearchingCountry: boolean;
  /**
   * @deprecated
   * This public API will be replaced in a next major release.
   */
  phoneValidator: PhoneValidator;
  /**
   * @deprecated
   * This public API will be replaced in a next major release.
   */
  countryGuesser: CountryGuesser;
  /**
   * @deprecated
   * This public API will be replaced in a next major release.
   */
  guessCountry: boolean;
  /**
   * @deprecated
   * This public API will be replaced in a next major release.
   */
  disableGuessLoading: boolean;
}
