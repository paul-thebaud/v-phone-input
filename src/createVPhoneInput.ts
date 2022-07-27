import VPhoneInput from '@/components/VPhoneInput.vue';
import { PluginOptions } from '@/types/options';
import { mergeOptions } from '@/utils/options';
import { PluginFunction } from 'vue';

export default function createVPhoneInput(options?: Partial<PluginOptions>): PluginFunction<never> {
  return (Vue, VueOptions) => {
    if (VueOptions) {
      throw new Error('options must be passed when calling createVPhoneInput');
    }

    mergeOptions(options || {});

    Vue.component('VPhoneInput', VPhoneInput);
  };
}
