import { Country } from '@/types/countries';
import PhoneNumber from 'awesome-phonenumber';
import Vue from 'vue';
import { VAutocomplete, VSelect, VTextField } from 'vuetify/lib/components';

export interface VPhoneCountryIconProps {
  readonly country: Country;

  readonly decorative: boolean;
}

export type VPhoneInputRefs = Vue['$refs'] & {
  countryInput: InstanceType<typeof VSelect | typeof VAutocomplete>;
  phoneInput: InstanceType<typeof VTextField> & { validate: () => boolean };
}

export type VPhoneInputRule =
  ((input: string, country: string, phone: PhoneNumber) => string | boolean)
  | ((input: string, country: string) => string | boolean)
  | ((input: string) => string | boolean);

export type VPhoneInputRules = (VPhoneInputRule | string)[];
