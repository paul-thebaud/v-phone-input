import { markRaw } from "vue";
import { VAutocomplete } from "vuetify/components";

/**
 * Properties to pass to use a `VAutocomplete` country input for `VPhoneInput`.
 */
export default {
  countryInputComponent: markRaw(VAutocomplete),
  countryInputComponentProps: {
    filterKeys: ["raw.name", "raw.iso2", "raw.dialCode"],
    autocomplete: "off",
    "aria-autocomplete": "off",
  },
};
