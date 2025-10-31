import { type FunctionalComponent, h } from "vue";
import getPhoneCountryIconAttrs from "../internals/getPhoneCountryIconAttrs";
import makePhoneInputCountryDisplayProps from "../props/makePhoneInputCountryDisplayProps.ts";
import type {
  VPhoneCountryDisplayProps,
  VPhoneInputCountryObject,
} from "../types";

/**
 * Render a country flag using `flag-icons` package.
 *
 * @param props
 *
 * @function
 */
const VPhoneCountryFlagSvg: FunctionalComponent<
  VPhoneCountryDisplayProps<VPhoneInputCountryObject>
> = /* @__PURE__ */ Object.assign(
  (props: VPhoneCountryDisplayProps<VPhoneInputCountryObject>) =>
    h("span", {
      ...getPhoneCountryIconAttrs(props),
      class: [
        "v-phone-input__country__icon",
        "fi",
        `fi-${props.country.iso2.toLowerCase()}`,
      ],
    }),
  { props: makePhoneInputCountryDisplayProps() },
);

export default VPhoneCountryFlagSvg;
