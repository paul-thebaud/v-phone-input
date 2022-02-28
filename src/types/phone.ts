import { CountryIso2 } from '@/types/countries';

export type PhoneNumberFormat = 'e164' |
  'international' |
  'national' |
  'rfc3966' |
  'significant';

export type PhoneNumberJson = {
  number: { input: string } & Record<PhoneNumberFormat, string | undefined>;
  possibility: string;
  possible: boolean;
  valid: boolean;
  regionCode: CountryIso2 | undefined;
}
