import Vue, { CreateElement, RenderContext, VNode } from 'vue';
import { VPhoneCountryIconProps } from '@/components/types';

export default Vue.extend({
  name: 'VPhoneCountryFlag',
  functional: true,
  render(createElement: CreateElement, context: RenderContext<VPhoneCountryIconProps>): VNode {
    return createElement('span', {
      staticClass: `v-phone-country-icon fi fi-${context.props.country.iso2.toLowerCase()}`,
    }, context.props.decorative ? [] : [
      createElement('span', { staticClass: 'd-sr-only' }, [context.props.country.name]),
    ]);
  },
});
