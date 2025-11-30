import { markRaw } from "vue";
import { VSelect } from "vuetify/components";

/**
 * Properties to pass to use a `VSelect` country input for `VPhoneInput`.
 */
export default /* @__PURE__ */ {
  countryInputComponent: /* @__PURE__ */ markRaw(VSelect),
  countryInputComponentProps: {},
};
