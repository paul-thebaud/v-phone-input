import makeVCountryProps from '@/composables/makeVCountryProps';
import useCountryIconAttrs from '@/composables/useCountryIconAttrs';
import { defineComponent, h } from 'vue';

export default defineComponent({
  props: makeVCountryProps(),
  setup(props) {
    const { role, title } = useCountryIconAttrs({ props });

    return () => h('span', {
      role: role.value,
      title: title.value,
      class: [
        'v-phone-input__country__icon', 'fi', `fi-${props.country!.iso2.toLowerCase()}`,
      ],
    });
  },
});
