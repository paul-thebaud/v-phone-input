import type { Component, HTMLAttributes, PropType, ReservedProps } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import type { VTextField } from "vuetify/components";
import undefinedBoolean from "../internals/undefinedBoolean.ts";
import type {
  VPhoneCountryDisplayProps,
  VPhoneCountryInputComponent,
  VPhoneInputCountryObject,
  VPhoneInputMessage,
} from "../types.ts";
import makePhoneInputComposableProps from "./makePhoneInputComposableProps.ts";

function makePhoneInputComponentSpecificProps<
  Country extends VPhoneInputCountryObject,
  CountryInputComponent extends VPhoneCountryInputComponent,
>() {
  return {
    /**
     * Country input component.
     *
     * @internal Use `usePhoneInput` instead if you want to use a custom component.
     */
    countryInputComponent: {
      type: [Function, Object] as PropType<CountryInputComponent>,
    },
    /**
     * Country input component specific props.
     *
     * @internal Use `countryProps` property instead.
     */
    countryInputComponentProps: {
      type: Object as PropType<ComponentProps<CountryInputComponent>>,
    },
    /**
     * Country display component.
     */
    countryDisplayComponent: {
      type: [Function, Object] as PropType<
        Component<VPhoneCountryDisplayProps<Country>>
      >,
    },
    /**
     * Toggle country input loading state whenever a country is currently guessing.
     */
    guessLoading: {
      type: [Boolean, Symbol] as PropType<boolean>,
      default: undefinedBoolean,
    },
    /**
     * Properties to pass to the wrapper div.
     */
    wrapperAttrs: {
      type: Object as PropType<
        HTMLAttributes & ReservedProps & Record<string, unknown>
      >,
    },
    /**
     * Properties to pass to the country input (`VSelect` or `VAutocomplete`).
     */
    countryProps: {
      type: Object as PropType<ComponentProps<CountryInputComponent>>,
    },
    /**
     * Properties to pass to the country input (`VTextField`).
     */
    phoneProps: {
      type: Object as PropType<ComponentProps<typeof VTextField>>,
    },
    /**
     * Customize the phone input hint.
     */
    hint: {
      type: [String, Function] as PropType<VPhoneInputMessage<Country>>,
    },
  } as const;
}

export default function makePhoneInputProps<
  Country extends VPhoneInputCountryObject,
  CountryInputComponent extends VPhoneCountryInputComponent,
>(): ReturnType<typeof makePhoneInputComposableProps<Country>> &
  ReturnType<
    typeof makePhoneInputComponentSpecificProps<Country, CountryInputComponent>
  > {
  return {
    ...makePhoneInputComposableProps<Country>(),
    ...makePhoneInputComponentSpecificProps<Country, CountryInputComponent>(),
  };
}
