import VPhoneInput from '@/components/VPhoneInput.vue';
import { PluginOptions } from '@/types/options';
import { mergeOptions } from '@/utils/options';
import { Plugin } from 'vue';

export default function createVPhoneInput(options?: Partial<PluginOptions>): Plugin {
  return (app, pluginOptions) => {
    if (pluginOptions) {
      console.warn('[v-phone-input] options must be passed as first argument of createVPhoneInput()');
    }

    mergeOptions(options || {});

    app.component('VPhoneInput', VPhoneInput);
  };
}
