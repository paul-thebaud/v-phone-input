import { markRaw } from "vue";
import { VSelect } from "vuetify/components";

/**
 * Properties to pass to use a `VSelect` country input for `VPhoneInput`.
 */
export default {
  countryInputComponent: markRaw(VSelect),
  countryInputComponentProps: {},
};
