import { VTextField } from "vuetify/components";
import type { makeVTextFieldProps } from "vuetify/lib/components/VTextField/VTextField.js";
import type {
  VPhoneCountryInputComponent,
  VPhoneInputCountryObject,
} from "../types.ts";
import makePhoneInputProps from "./makePhoneInputProps.ts";

/**
 * Make phone input properties definition, with inherited `VTextField` props.
 *
 * @internal
 */
export default /* @__NO_SIDE_EFFECTS__ */ function makePhoneInputCompleteProps<
  Country extends VPhoneInputCountryObject,
  CountryInputComponent extends VPhoneCountryInputComponent,
>(): Omit<
  ReturnType<typeof makeVTextFieldProps>,
  keyof ReturnType<typeof makePhoneInputProps<Country, CountryInputComponent>>
> &
  ReturnType<typeof makePhoneInputProps<Country, CountryInputComponent>> {
  return {
    ...(VTextField.props as ReturnType<typeof makeVTextFieldProps>),
    ...makePhoneInputProps<Country, CountryInputComponent>(),
  };
}
