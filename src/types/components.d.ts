import { Country } from '@/types/countries';
import { MessageOptions } from '@/types/options';
import { PhoneNumberObject } from '@/types/phone';

export interface VPhoneCountryIconProps {
  readonly country: Country;

  readonly decorative: boolean;
}

export type VPhoneCountriesItems = ((Country & { preferred?: boolean }) | { divider: boolean })[];

export type VPhoneInputRule = ((input: string) => string | boolean)
  | ((input: string, phone: PhoneNumberObject) => string | boolean)
  | ((input: string, phone: PhoneNumberObject, messageOptions: MessageOptions) => string | boolean);

export type VPhoneInputRules = (VPhoneInputRule | string)[];
