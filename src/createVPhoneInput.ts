import VPhoneInput from '@/components/VPhoneInput.vue';
import { PluginOptions } from '@/types/options';
import { mergeOptions } from '@/utils/options';
import { PluginFunction } from 'vue';

export default function createVPhoneInput(options?: PluginOptions): PluginFunction<PluginOptions> {
  return (Vue) => {
    mergeOptions(options || {});

    Vue.component('VPhoneInput', VPhoneInput);
  };
}
