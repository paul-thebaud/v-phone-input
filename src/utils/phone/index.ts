import { CountryIso2 } from '@/types/countries';
import { PhoneNumberFormat, PhoneNumberObject } from '@/types/phone';
import PhoneNumber from 'awesome-phonenumber';

export default class PhoneUtils {
  static make(
    phone?: string | null,
    iso2?: CountryIso2,
  ): PhoneNumber & { toJSON: () => PhoneNumberObject } {
    return PhoneNumber((phone || '').trim(), iso2);
  }

  static makeExample(iso2: CountryIso2): PhoneNumberObject {
    return PhoneNumber.getExample(iso2).toJSON();
  }

  static format(phone: PhoneNumberObject, format: PhoneNumberFormat): string {
    return phone.number[format] || phone.number.input;
  }
}
