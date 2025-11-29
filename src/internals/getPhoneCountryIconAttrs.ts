import type {
  VPhoneCountryDisplayProps,
  VPhoneInputCountryObject,
} from "../types";

/**
 * Get country icon attributes.
 *
 * @param props
 *
 * @internal
 */
export default function getPhoneCountryIconAttrs(
  props: VPhoneCountryDisplayProps<VPhoneInputCountryObject>,
) {
  return props.decorative
    ? {}
    : {
        role: "img",
        title: props.country.name,
        "aria-label": props.country.name,
      };
}
