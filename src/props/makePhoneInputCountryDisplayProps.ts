import type { PropType } from "vue";
import type { VPhoneInputCountryObject } from "../types.ts";

/**
 * Make phone input country display properties definition.
 *
 * @internal
 */
export default function makePhoneInputCountryDisplayProps<
  Country extends VPhoneInputCountryObject,
>() {
  return {
    /**
     * Country to display.
     */
    country: {
      required: true,
      type: Object as PropType<Country>,
    },
    /**
     * Tells if the icon should be ignored by screen readers or if it must have
     * an accessible name (e.g. through `title` attribute).
     */
    decorative: {
      type: Boolean as PropType<boolean>,
    },
  } as const;
}
