import { computed } from 'vue';

interface UseCountrySelectComponentParams {
  props: { enableSearchingCountry: boolean };
}

export default function useCountrySelectComponent({ props }: UseCountrySelectComponentParams) {
  const countrySelectComponent = computed(() => (
    props.enableSearchingCountry
      ? {
        type: 'VAutocomplete',
        props: {
          autocomplete: 'new-password',
          'aria-autocomplete': 'off',
        },
      } : {
        type: 'VSelect',
        props: {},
      }
  ));

  return { countrySelectComponent };
}
