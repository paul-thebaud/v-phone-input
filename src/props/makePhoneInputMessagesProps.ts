import type { PhoneNumberFormat } from "awesome-phonenumber";
import type { PropType } from "vue";
import type { VPhoneInputCountryObject, VPhoneInputMessage } from "../types.ts";

/**
 * Make phone input messages composable properties definition.
 *
 * @internal
 */
export default function makePhoneInputMessagesProps<
  Country extends VPhoneInputCountryObject,
>() {
  return {
    /**
     * Format example phone.
     *
     * @remarks
     * Using `null` will disable formating example phone numbers.
     *
     * @defaultValue
     * `displayFormat` value if available, `'national'` otherwise.
     */
    exampleFormat: {
      type: [String, null] as PropType<PhoneNumberFormat | null>,
    },
    /**
     * Customize the phone input example.
     *
     * @defaultValue
     * Use `awesome-phonenumber` package's `getExample` function with current country.
     */
    example: {
      type: [String, Function] as PropType<
        VPhoneInputMessage<Country, undefined, undefined>
      >,
    },
    /**
     * Customize the phone input label.
     *
     * @defaultValue
     * `'Phone'`
     */
    label: {
      type: [String, Function] as PropType<
        VPhoneInputMessage<Country, undefined>
      >,
    },
    /**
     * Customize the phone input `aria-label`.
     */
    ariaLabel: {
      type: [String, Function, null] as PropType<VPhoneInputMessage<
        Country,
        undefined
      > | null>,
    },
    /**
     * Customize the country input label.
     */
    countryLabel: {
      type: [
        String,
        Function,
        null,
      ] as PropType<VPhoneInputMessage<Country> | null>,
    },
    /**
     * Customize the country input `aria-label`.
     *
     * @defaultValue
     * `'Country for <label>'`
     */
    countryAriaLabel: {
      type: [
        String,
        Function,
        null,
      ] as PropType<VPhoneInputMessage<Country> | null>,
    },
    /**
     * Customize the phone input placeholder.
     */
    placeholder: {
      type: [
        String,
        Function,
        null,
      ] as PropType<VPhoneInputMessage<Country> | null>,
    },
    /**
     * Customize the phone input invalid message returned by the
     * `validate` function generated rule.
     *
     * @defaultValue
     * `'The "<label>" field is not a valid phone number (example: <example>).'`
     */
    invalidMessage: {
      type: [
        String,
        Function,
        null,
      ] as PropType<VPhoneInputMessage<Country> | null>,
    },
  } as const;
}
