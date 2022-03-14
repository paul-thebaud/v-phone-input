import { CountryIso2 } from '@/types/countries';
import { ExtendedPhoneNumber, PhoneNumberFormat, PhoneNumberObject } from '@/types/phone';
import PhoneNumber from 'awesome-phonenumber';

export default class PhoneUtils {
  static AwesomePhoneNumber = PhoneNumber;

  static make(
    phone?: string | null,
    iso2?: CountryIso2,
  ): ExtendedPhoneNumber {
    return this.AwesomePhoneNumber((phone || '').trim(), iso2);
  }

  static makeExample(iso2: CountryIso2): ExtendedPhoneNumber {
    return this.AwesomePhoneNumber.getExample(iso2);
  }

  static format(phone: PhoneNumberObject, format: PhoneNumberFormat): string {
    return phone.number[format] || phone.number.input;
  }
}
