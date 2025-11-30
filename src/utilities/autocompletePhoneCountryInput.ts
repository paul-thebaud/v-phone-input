import { markRaw } from "vue";
import { VAutocomplete } from "vuetify/components";

/**
 * Properties to pass to use a `VAutocomplete` country input for `VPhoneInput`.
 */
export default /* @__PURE__ */ {
  countryInputComponent: /* @__PURE__ */ markRaw(VAutocomplete),
  countryInputComponentProps: {
    filterKeys: ["raw.name", "raw.iso2", "raw.dialCode"],
    autocomplete: "off",
    "aria-autocomplete": "off",
  },
};
