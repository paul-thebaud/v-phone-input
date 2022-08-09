import { Country } from '@/types/countries';
import { PropType } from 'vue';

export interface VCountryProps {
  country: Country;
  decorative: boolean;
}

export default function makeVCountryProps() {
  return {
    country: {
      required: true,
      type: Object as PropType<Country>,
    },
    decorative: {
      required: true,
      type: Boolean,
    },
  };
}
