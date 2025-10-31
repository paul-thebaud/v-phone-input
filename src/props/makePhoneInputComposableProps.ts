import type { ParsedPhoneNumber, PhoneNumberFormat } from "awesome-phonenumber";
import type { PropType } from "vue";
import undefinedBoolean from "../internals/undefinedBoolean.ts";
import type { VPhoneInputCountryGuesser, VPhoneInputCountryObject } from "../types.ts";
import makePhoneInputCountryProps from "./makePhoneInputCountryProps.ts";
import makePhoneInputMessagesProps from "./makePhoneInputMessagesProps.ts";

function makePhoneInputComposableSpecificProps() {
  return {
    /**
     * Guess the country of the user.
     */
    guessCountry: {
      type: Function as PropType<VPhoneInputCountryGuesser>,
    },
    /**
     * Format phone number for `modelValue` updates.
     *
     * @remarks
     * This only applies to valid phone numbers.
     * Using `null` will disable format feature and keep the input as is.
     *
     * @defaultValue
     * `'e164'`
     */
    modelFormat: {
      type: [String, null] as PropType<PhoneNumberFormat | null>,
    },
    /**
     * Format phone number for text input value.
     *
     * @remarks
     * This only applies to valid phone numbers.
     * Using `null` will disable format feature and keep the input as is.
     *
     * @defaultValue
     * `'national'`
     */
    displayFormat: {
      type: [String, null] as PropType<PhoneNumberFormat | null>,
    },
    /**
     * Delay (in milliseconds) before formatting the phone number
     * for text input value when detecting an input.
     *
     * @remarks
     * This only applies to valid phone numbers.
     * Using `0` will format immediately after input.
     *
     * @defaultValue
     * `1000` if `displayFormatOnBlur` is disabled.
     */
    displayFormatDelay: {
      type: [Number, Boolean, Symbol] as PropType<number | boolean>,
      default: undefinedBoolean,
    },
    /**
     * Format the phone number for text input only on blur event.
     *
     * @remarks
     * This bypass the `displayFormatDelay` option, and only format the phone
     * number on blur event or on `displayFormat` property change.
     * Using `false` will restore the `displayFormatDelay` behavior.
     * When using the composable, it is required to bind `countryInputRef` and
     * `phoneInputRef` to appropriate focusable inputs.
     *
     * @defaultValue
     * `true`
     */
    displayFormatOnBlur: {
      type: [Boolean, Symbol] as PropType<boolean>,
      default: undefinedBoolean,
    },
    /**
     * Validate a phone number.
     *
     * @remarks
     * Using `null` will disable the validation.
     *
     * @defaultValue
     * `valid` property value of the given `ParsedPhoneNumber` object.
     */
    validate: {
      type: [Function, null] as PropType<
        ((phone: ParsedPhoneNumber | null) => boolean) | null
      >,
    },
  };
}

export default function makePhoneInputComposableProps<
  Country extends VPhoneInputCountryObject,
>(): ReturnType<typeof makePhoneInputCountryProps<Country>> &
  ReturnType<typeof makePhoneInputMessagesProps<Country>> &
  ReturnType<typeof makePhoneInputComposableSpecificProps> {
  return {
    ...makePhoneInputCountryProps<Country>(),
    ...makePhoneInputMessagesProps<Country>(),
    ...makePhoneInputComposableSpecificProps(),
  } as const;
}
