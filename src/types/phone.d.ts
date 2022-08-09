import { CountryIso2 } from '@/types/countries';
import { PhoneNumber, PhoneNumberFormat } from 'awesome-phonenumber';

export type PhoneNumberObject = {
  number: { input: string } & Partial<Record<PhoneNumberFormat, string>>;
  possibility: string;
  possible: boolean;
  valid: boolean;
  regionCode: CountryIso2 | undefined;
}

export type ExtendedPhoneNumber = PhoneNumber & { toJSON: () => PhoneNumberObject };
