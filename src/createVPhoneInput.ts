import type { Plugin } from "vue";
import VPhoneInput from "./components/VPhoneInput.vue";
import { V_PHONE_INPUT_INJECTION_KEY } from "./internals/injectPhoneInputPluginOptions";
import type {
  VPhoneCountryInputComponent,
  VPhoneInputCountryObject,
  VPhoneInputPluginOptions,
} from "./types";

/**
 * Provide given options to app and register `VPhoneInput` component.
 *
 * @param options
 */
export default function createVPhoneInput<
  Country extends VPhoneInputCountryObject = VPhoneInputCountryObject,
  CountryInputComponent extends
    VPhoneCountryInputComponent = VPhoneCountryInputComponent,
>(
  options?: VPhoneInputPluginOptions<Country, CountryInputComponent>,
): Plugin<[] | [VPhoneInputPluginOptions<Country, CountryInputComponent>]> {
  return (app, pluginOptions) => {
    app.provide(V_PHONE_INPUT_INJECTION_KEY, { ...options, ...pluginOptions });

    app.component("VPhoneInput", VPhoneInput);
  };
}
