import {
  getCountryCodeForRegionCode,
  getSupportedRegionCodes,
} from "awesome-phonenumber";
import countriesJson from "countries-list/minimal/countries.2to3.min.json";
import { computed, type MaybeRef, unref } from "vue";
import type {
  VPhoneInputCountryComposable,
  VPhoneInputCountryComposableOptions,
  VPhoneInputCountryObject,
  VPhoneInputCountryObjectOrIso2,
} from "../types";
import usePhoneInputPluginOptions from "./usePhoneInputPluginOptions.ts";

const normalizeCountryIso2 = (country: string | null | undefined) =>
  (country ?? "").toUpperCase();

const normalizeCountry = (
  country: VPhoneInputCountryObjectOrIso2 | null | undefined,
) =>
  normalizeCountryIso2(typeof country === "string" ? country : country?.iso2);

const normalizeCountriesSet = (
  countries: MaybeRef<VPhoneInputCountryObjectOrIso2[] | undefined>,
) => new Set((unref(countries) ?? []).map(normalizeCountry));

const getDefaultCountries = (
  countryName: (iso2: string) => string,
): VPhoneInputCountryObject[] =>
  Object.keys(countriesJson)
    .map((iso2) => ({
      name: countryName(iso2),
      dialCode: `${getCountryCodeForRegionCode(iso2)}`,
      iso2,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

/**
 * Composable to manage phone input countries.
 *
 * @param options
 *
 * @internal
 */
export default function usePhoneInputCountries<
  Country extends VPhoneInputCountryObject = VPhoneInputCountryObject,
>(
  options: VPhoneInputCountryComposableOptions<Country>,
): VPhoneInputCountryComposable<Country> {
  const supportedCountries = getSupportedRegionCodes();

  const { getOption, useOption } = usePhoneInputPluginOptions<Country>();

  const countryLocaleOption = useOption("countryLocale", options, "en");
  const countryNameOption = useOption(
    "countryName",
    options,
    (iso2: string) => countryDisplayNames.value.of(iso2) ?? iso2,
  );
  const countriesOption = computed(
    () =>
      getOption(
        "countries",
        options,
        getDefaultCountries(countryNameOption.value),
      ) as Country[],
  );
  const preferCountriesOption = computed(() =>
    normalizeCountriesSet(getOption("preferCountries", options) ?? []),
  );
  const includeCountriesOption = computed(() =>
    normalizeCountriesSet(getOption("includeCountries", options) ?? []),
  );
  const excludeCountriesOption = computed(() =>
    normalizeCountriesSet(getOption("excludeCountries", options) ?? []),
  );
  const defaultCountryOption = useOption("defaultCountry", options);

  const countryDisplayNames = computed(
    () =>
      new Intl.DisplayNames([countryLocaleOption.value ?? "en"], {
        type: "region",
      }),
  );

  const countriesByIso2 = computed(() => {
    const countries = countriesOption.value.reduce((map, country) => {
      const iso2 = normalizeCountry(country);
      if (
        supportedCountries.indexOf(iso2) !== -1 &&
        (!includeCountriesOption.value.size ||
          includeCountriesOption.value.has(iso2)) &&
        (!excludeCountriesOption.value.size ||
          !excludeCountriesOption.value.has(iso2))
      ) {
        map.set(iso2, country);
      }

      return map;
    }, new Map<string, Country>());

    if (!countries.size) {
      throw new Error(
        "[VPhoneInput] Countries list must contain at least one country.",
      );
    }

    return countries;
  });

  const findCountry = computed(
    () => (value: VPhoneInputCountryObjectOrIso2 | null | undefined) =>
      value
        ? (countriesByIso2.value.get(normalizeCountry(value)) ?? null)
        : null,
  );

  const countriesPreference = computed(() => {
    const preferred: Country[] = [];
    const unpreferred = new Map(countriesByIso2.value);

    preferCountriesOption.value.forEach((iso2) => {
      const unpreferredCountry = unpreferred.get(iso2);
      if (unpreferredCountry) {
        preferred.push(unpreferredCountry);
        unpreferred.delete(iso2);
      }
    });

    return {
      preferred,
      unpreferred: [...unpreferred.values()],
    };
  });

  const preferredCountries = computed(
    () => countriesPreference.value.preferred,
  );
  const unpreferredCountries = computed(
    () => countriesPreference.value.unpreferred,
  );
  const countries = computed(() => [
    ...preferredCountries.value,
    ...unpreferredCountries.value,
  ]);
  const defaultCountry = computed(() =>
    findCountry.value(defaultCountryOption.value),
  );
  const fallbackCountry = computed(
    // biome-ignore lint/style/noNonNullAssertion: Countries is non-empty as this step.
    () => defaultCountry.value ?? countries.value[0]!,
  );

  return {
    countries,
    preferredCountries,
    unpreferredCountries,
    defaultCountry,
    fallbackCountry,
    findCountry,
  };
}
