import { Country } from '@/types/countries';
import normalizeCountryIso2 from '@/utils/countries/normalizeCountryIso2';
import { getCountryCodeForRegionCode } from 'awesome-phonenumber';
import countriesEnNames from 'countries-list/minimal/countries.en.min.json';
import countriesNativeNames from 'countries-list/minimal/countries.native.min.json';

export default Object.entries(countriesEnNames)
  .sort(([_a, a], [_b, b]) => a.localeCompare(b))
  .map(([code, enName]) => ({
    name: enName !== countriesNativeNames[code as keyof typeof countriesNativeNames]
      ? `${countriesNativeNames[code as keyof typeof countriesNativeNames]} (${enName})`
      : countriesNativeNames[code as keyof typeof countriesNativeNames],
    iso2: normalizeCountryIso2(code),
    dialCode: `${getCountryCodeForRegionCode(code)}`,
  } as Country));
