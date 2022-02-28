import VPhoneCountrySpan from '@/components/VPhoneCountrySpan';
import { VPhoneCountryIconProps } from '@/types/components';
import Vue, { CreateElement, RenderContext, VNode } from 'vue';

export default Vue.extend({
  name: 'VPhoneCountrySprite',
  functional: true,
  render(createElement: CreateElement, context: RenderContext<VPhoneCountryIconProps>): VNode {
    return createElement('span', { staticClass: 'f32' }, [
      createElement(VPhoneCountrySpan, {
        staticClass: `flag ${context.props.country.iso2.toLowerCase()}`,
        props: context.props,
      }),
    ]);
  },
});
