import { inject } from "vue";
import type {
  VPhoneCountryInputComponent,
  VPhoneInputCountryObject,
  VPhoneInputPluginOptions,
} from "../types";

/**
 * Injection key for VPhoneInput options.
 *
 * @internal
 */
export const V_PHONE_INPUT_INJECTION_KEY = Symbol(
  "VPhoneInput options injection key",
);

/**
 * Inject VPhoneInput options.
 *
 * @internal
 */
export default function injectPhoneInputPluginOptions<
  Country extends VPhoneInputCountryObject = VPhoneInputCountryObject,
  CountryInputComponent extends
    VPhoneCountryInputComponent = VPhoneCountryInputComponent,
>() {
  return inject<VPhoneInputPluginOptions<Country, CountryInputComponent>>(
    V_PHONE_INPUT_INJECTION_KEY,
    {},
  );
}
