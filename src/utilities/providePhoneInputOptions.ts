import { provide } from "vue";
import { V_PHONE_INPUT_INJECTION_KEY } from "../internals/injectPhoneInputPluginOptions";
import type {
  VPhoneCountryInputComponent,
  VPhoneInputCountryObject,
  VPhoneInputPluginOptions,
} from "../types";

/**
 * Provide given phone input options to current Vue context.
 *
 * @param options
 */
export default function providePhoneInputOptions<
  Country extends VPhoneInputCountryObject = VPhoneInputCountryObject,
  CountryInputComponent extends
    VPhoneCountryInputComponent = VPhoneCountryInputComponent,
>(options: VPhoneInputPluginOptions<Country, CountryInputComponent>) {
  provide(V_PHONE_INPUT_INJECTION_KEY, options);
}
