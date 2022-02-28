import { VPhoneCountryIconProps } from '@/types/components';
import Vue, { CreateElement, RenderContext, VNode } from 'vue';

export default Vue.extend({
  name: 'VPhoneCountrySpan',
  functional: true,
  render(createElement: CreateElement, context: RenderContext<VPhoneCountryIconProps>): VNode {
    return createElement('span', {
      staticClass: `v-phone-input__country__country-icon ${context.data.staticClass}`,
    }, context.props.decorative ? [] : [
      createElement('span', { staticClass: 'd-sr-only' }, [context.props.country.name]),
    ]);
  },
});
