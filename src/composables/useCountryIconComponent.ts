import VPhoneCountrySprite from '@/components/VCountryIconSprite';
import VPhoneCountrySvg from '@/components/VCountryIconSvg';
import { CountryIconMode } from '@/types/options';
import { computed } from 'vue';

interface UseCountryIconComponentParams {
  props: { countryIconMode: CountryIconMode };
}

export default function useCountryIconComponent({ props }: UseCountryIconComponentParams) {
  const countryIconComponent = computed(() => {
    switch (props.countryIconMode) {
      case 'svg':
        return VPhoneCountrySvg;
      case 'sprite':
        return VPhoneCountrySprite;
      case 'text':
        return undefined;
      default:
        return props.countryIconMode;
    }
  });

  return { countryIconComponent };
}
