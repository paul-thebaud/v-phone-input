import type { PropType } from "vue";
import type {
  VPhoneInputCountryObject,
  VPhoneInputCountryObjectOrIso2,
} from "../types.ts";

/**
 * Make phone input country composable properties definition.
 *
 * @internal
 */
export default function makePhoneInputCountryProps<
  Country extends VPhoneInputCountryObject,
>() {
  return {
    /**
     * Locale to use when localizing country names.
     *
     * @defaultValue
     * `'en'`
     */
    countryLocale: {
      type: String as PropType<string>,
    },
    /**
     * Resolve a country name from its ISO-2 code.
     *
     * @defaultValue
     * Uses `Intl.DisplayNames` to localize the country name in defined `countryLocale`.
     */
    countryName: {
      type: Function as PropType<(iso2: string) => string>,
    },
    /**
     * List of available countries.
     *
     * @defaultValue
     * Uses `countries-list` two-letter codes, dial codes resolved using
     * `awesome-phonenumber` package's `getCountryCodeForRegionCode`, and
     * given locale (or `en`) translated names using `Intl.DisplayNames`.
     */
    countries: {
      type: Array as PropType<Country[]>,
    },
    /**
     * List of countries to prefer.
     *
     * @remarks
     * When specified, any country which is in the list will appear first
     * in available countries.
     */
    preferCountries: {
      type: Array as PropType<VPhoneInputCountryObjectOrIso2[]>,
    },
    /**
     * List of countries to include.
     *
     * @remarks
     * When specified, any country which is not in this list will be excluded
     * from available countries.
     */
    includeCountries: {
      type: Array as PropType<VPhoneInputCountryObjectOrIso2[]>,
    },
    /**
     * List of countries to exclude.
     *
     * @remarks
     * When specified, any country which is in this list will be excluded
     * from available countries.
     */
    excludeCountries: {
      type: Array as PropType<VPhoneInputCountryObjectOrIso2[]>,
    },
    /**
     * Default country to use.
     *
     * @defaultValue
     * First country from the available `countries` list.
     */
    defaultCountry: {
      type: [String, Object] as PropType<VPhoneInputCountryObjectOrIso2>,
    },
  } as const;
}
