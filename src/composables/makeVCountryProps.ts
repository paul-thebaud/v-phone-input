import { Country } from '@/types/countries';
import { PropType } from 'vue';

export interface VCountryProps {
  country: Country;
  decorative?: boolean;
}

export default function makeVCountryProps() {
  return {
    country: {
      required: true,
      type: Object as PropType<Country>,
    },
    decorative: {
      type: Boolean,
      default: false,
    },
  } as const;
}
