import VPhoneCountrySpan from '@/components/VPhoneCountrySpan';
import { VPhoneCountryIconProps } from '@/types/components';
import Vue, { CreateElement, RenderContext, VNode } from 'vue';

export default Vue.extend({
  name: 'VPhoneCountrySvg',
  functional: true,
  render(createElement: CreateElement, context: RenderContext<VPhoneCountryIconProps>): VNode {
    return createElement(VPhoneCountrySpan, {
      staticClass: `fi fi-${context.props.country.iso2.toLowerCase()}`,
      props: context.props,
    });
  },
});
