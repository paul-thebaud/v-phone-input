import { type FunctionalComponent, h } from "vue";
import getPhoneCountryIconAttrs from "../internals/getPhoneCountryIconAttrs";
import makePhoneInputCountryDisplayProps from "../props/makePhoneInputCountryDisplayProps.ts";
import type {
  VPhoneCountryDisplayProps,
  VPhoneInputCountryObject,
} from "../types";

/**
 * Render a country flag using `world-flags-sprite` package.
 *
 * @param props
 *
 * @function
 */
const VPhoneCountryFlagSprite: FunctionalComponent<
  VPhoneCountryDisplayProps<VPhoneInputCountryObject>
> = /* @__PURE__ */ Object.assign(
  (props: VPhoneCountryDisplayProps<VPhoneInputCountryObject>) =>
    h(
      "span",
      {
        ...getPhoneCountryIconAttrs(props),
        class: ["v-phone-input__country__icon", "f32"],
      },
      h("span", { class: ["flag", props.country.iso2.toLowerCase()] }),
    ),
  { props: makePhoneInputCountryDisplayProps() },
);

export default VPhoneCountryFlagSprite;
