import { Country } from '@/types/countries';
import normalizeCountryIso2 from '@/utils/countries/normalizeCountryIso2';
import { getCountryCodeForRegionCode } from 'awesome-phonenumber';
import countriesEnNames from 'countries-list/minimal/countries.en.min.json';
import countriesNativeNames from 'countries-list/minimal/countries.native.min.json';

/**
 * Default countries list for VPhoneInput.
 *
 * @deprecated
 * This public API will be removed in a next major release.
 * Define your own custom country list.
 */
const countries = Object.entries(countriesEnNames)
  .sort(([, a], [, b]) => a.localeCompare(b))
  .map(([code, enName]) => ({
    name: enName !== countriesNativeNames[code as keyof typeof countriesNativeNames]
      ? `${countriesNativeNames[code as keyof typeof countriesNativeNames]} (${enName})`
      : countriesNativeNames[code as keyof typeof countriesNativeNames],
    iso2: normalizeCountryIso2(code),
    dialCode: `${getCountryCodeForRegionCode(code)}`,
  } as Country));

export default countries;
