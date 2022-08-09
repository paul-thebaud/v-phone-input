import { VCountryProps } from '@/composables/makeVCountryProps';
import { computed } from 'vue';

interface UseCountriesIconAttrsParams {
  props: VCountryProps;
}

export default function useCountryIconAttrs({ props }: UseCountriesIconAttrsParams) {
  const role = computed(() => (props.decorative ? undefined : 'img'));
  const title = computed(() => (props.decorative ? undefined : props.country.name));

  return { role, title };
}
