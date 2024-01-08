import { Country, CountryGuesser, CountryIso2, CountryMap, CountryOrIso2 } from '@/types/countries';
import isPreferableCountryGuesser from '@/utils/countries/isPreferableCountryGuesser';
import normalizeCountryIso2 from '@/utils/countries/normalizeCountryIso2';
import { computed, ComputedRef, ref, watchEffect } from 'vue';

interface UseCountriesParams {
  props: {
    allCountries: Country[];
    preferCountries: CountryOrIso2[];
    includeCountries: CountryOrIso2[];
    excludeCountries: CountryOrIso2[];
    guessCountry: boolean;
    countryGuesser: CountryGuesser;
    disableGuessLoading: boolean;
  };
}

export default function useCountries({ props }: UseCountriesParams) {
  const countriesByIso2 = ref({} as CountryMap);
  const countriesCount = ref(0);
  const preferredCountries = ref([] as Country[]);
  const otherCountries = ref([] as Country[]);

  const normalizedPrefer = computed(() => props.preferCountries.map(normalizeCountryIso2));
  const normalizedInclude = computed(() => props.includeCountries.map(normalizeCountryIso2));
  const normalizedExclude = computed(() => props.excludeCountries.map(normalizeCountryIso2));

  watchEffect(() => {
    const newCountriesByIso2 = {} as CountryMap;
    const newPreferredCountries = [] as Country[];
    const newOtherCountries = [] as Country[];

    props.allCountries.forEach((country) => {
      const normalizedIso2 = normalizeCountryIso2(country.iso2);

      if (normalizedInclude.value.length
        && normalizedInclude.value.indexOf(normalizedIso2) === -1
      ) {
        return;
      }

      if (normalizedExclude.value.indexOf(normalizedIso2) !== -1) {
        return;
      }

      const normalizedCountry = { ...country, iso2: normalizedIso2 };
      newCountriesByIso2[normalizedCountry.iso2] = normalizedCountry;

      if (normalizedPrefer.value.indexOf(normalizedIso2) !== -1) {
        newPreferredCountries.push(normalizedCountry);
      } else {
        newOtherCountries.push(normalizedCountry);
      }
    });

    countriesByIso2.value = newCountriesByIso2;
    preferredCountries.value = newPreferredCountries;
    otherCountries.value = newOtherCountries;
    countriesCount.value = newPreferredCountries.length + newOtherCountries.length;

    if (!countriesCount.value) {
      console.error('[v-phone-input] resulting countries from "allCountries", "includeCountries" and "excludeCountries" must be a non-empty list');
    }
  });

  const firstCountry = computed(() => {
    const country = preferredCountries.value[0] ?? otherCountries.value[0];

    return country ? countriesByIso2.value[country.iso2] : undefined;
  });

  const findCountry = (iso2?: CountryOrIso2): Country | undefined => (
    countriesByIso2.value[normalizeCountryIso2(iso2)]
  );

  const lazyGuessingCountry = ref(false);

  const guessingCountry = computed(() => !props.disableGuessLoading && lazyGuessingCountry.value);

  const setCountryPreference = (country: CountryIso2) => {
    lazyGuessingCountry.value = false;

    if (isPreferableCountryGuesser(props.countryGuesser)) {
      props.countryGuesser.setPreference(country);
    }
  };

  const guessCountry = async () => {
    if (!props.guessCountry) {
      return undefined;
    }

    lazyGuessingCountry.value = true;

    const guessedCountry = findCountry(await props.countryGuesser.guess());

    lazyGuessingCountry.value = false;

    return guessedCountry?.iso2;
  };

  return {
    countriesCount,
    preferredCountries,
    otherCountries,
    guessingCountry,
    findCountry,
    firstCountry: firstCountry as ComputedRef<Country>,
    setCountryPreference,
    guessCountry,
  };
}
