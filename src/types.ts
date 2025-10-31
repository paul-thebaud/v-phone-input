import type { ParsedPhoneNumber } from "awesome-phonenumber";
import type {
  ComputedRef,
  ExtractPropTypes,
  MaybeRef,
  Ref,
  ShallowRef,
  VNode,
  WritableComputedRef,
} from "vue";
import type { ComponentSlots } from "vue-component-type-helpers";
import type { VAutocomplete, VSelect, VTextField } from "vuetify/components";
import type makePhoneInputComposableProps from "./props/makePhoneInputComposableProps.ts";
import type makePhoneInputCountryDisplayProps from "./props/makePhoneInputCountryDisplayProps.ts";
import type makePhoneInputCountryProps from "./props/makePhoneInputCountryProps.ts";
import type makePhoneInputMessagesProps from "./props/makePhoneInputMessagesProps.ts";
import type makePhoneInputProps from "./props/makePhoneInputProps.ts";

/**
 * Convert an options interface to a composable options interface.
 *
 * @internal
 */
export type VPhoneInputExtractComposableOptions<Props extends {}> = {
  [K in keyof Props]?: MaybeRef<Props[K]> | undefined;
};

/**
 * Country object.
 */
export interface VPhoneInputCountryObject {
  /**
   * Human-readable name.
   */
  readonly name: string;
  /**
   * Two-letter code.
   *
   * @see https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
   */
  readonly iso2: string;
  /**
   * Dial code (without the `+` symbol prefix).
   *
   * @see https://en.wikipedia.org/wiki/List_of_telephone_country_codes
   */
  readonly dialCode: string;
}

/**
 * Country object or valid two-letter code.
 *
 * @internal
 */
export type VPhoneInputCountryObjectOrIso2 =
  | VPhoneInputCountryObject
  | VPhoneInputCountryObject["iso2"];

/**
 * Country guesser function result.
 *
 * @internal
 */
export type VPhoneInputCountryGuesserResult =
  | VPhoneInputCountryObjectOrIso2
  | null
  | undefined;

/**
 * Country guesser function.
 *
 * @internal
 */
export interface VPhoneInputCountryGuesser {
  /**
   * Guess a country.
   */
  ():
    | Promise<VPhoneInputCountryGuesserResult>
    | VPhoneInputCountryGuesserResult;

  /**
   * Previously memoized country two-letter code.
   *
   * @remarks
   * Property should only be available when the country guesser function supports memoization.
   * It is set to memoize the currently selected country.
   * It is retrieved to avoid running guesser function when a memoized country is available.
   */
  memoized?: MaybeRef<string | null | undefined>;
}

/**
 * Props to customize country related features.
 *
 * @internal
 */
export interface VPhoneInputCountryProps<
  Country extends VPhoneInputCountryObject,
> extends Readonly<
    Partial<
      ExtractPropTypes<ReturnType<typeof makePhoneInputCountryProps<Country>>>
    >
  > {}

/**
 * Options for `usePhoneInputCountries` composable.
 *
 * @internal
 */
export interface VPhoneInputCountryComposableOptions<
  Country extends VPhoneInputCountryObject,
> extends VPhoneInputExtractComposableOptions<
    VPhoneInputCountryProps<Country>
  > {}

/**
 * `usePhoneInputCountries` composable.
 *
 * @internal
 */
export interface VPhoneInputCountryComposable<
  Country extends VPhoneInputCountryObject,
> {
  /**
   * List of available countries.
   */
  readonly countries: ComputedRef<Country[]>;
  /**
   * List of available preferred countries.
   */
  readonly preferredCountries: ComputedRef<Country[]>;
  /**
   * List of available unpreferred countries.
   */
  readonly unpreferredCountries: ComputedRef<Country[]>;
  /**
   * Default country to use.
   */
  readonly defaultCountry: ComputedRef<Country | null>;
  /**
   * Fallback country to use.
   */
  readonly fallbackCountry: ComputedRef<Country>;
  /**
   * Find a country object using a country object or two-letter code.
   */
  readonly findCountry: ComputedRef<
    (value: VPhoneInputCountryObjectOrIso2 | null | undefined) => Country | null
  >;
}

/**
 * Message factory context.
 *
 * @remarks
 * Context may vary depending on the message to build.
 *
 * @internal
 */
export interface VPhoneInputMessageFactoryContext<
  Country extends VPhoneInputCountryObject,
  Label extends string | undefined = string,
  Example extends string | undefined = string,
> {
  /**
   * Current country.
   */
  readonly country: Country;
  /**
   * Current country's phone number example.
   */
  readonly example: Example;
  /**
   * Current phone input's label.
   */
  readonly label: Label;
}

/**
 * Build a message for a given context.
 *
 * @internal
 */
export type VPhoneInputMessageFactory<
  Country extends VPhoneInputCountryObject,
  Label extends string | undefined = string,
  Example extends string | undefined = string,
> = (
  context: VPhoneInputMessageFactoryContext<Country, Label, Example>,
) => string;

/**
 * Message string or factory.
 *
 * @internal
 */
export type VPhoneInputMessage<
  Country extends VPhoneInputCountryObject,
  Label extends string | undefined = string,
  Example extends string | undefined = string,
> = string | VPhoneInputMessageFactory<Country, Label, Example>;

/**
 * Props to customize localization related features.
 *
 * @internal
 */
export interface VPhoneInputMessagesProps<
  Country extends VPhoneInputCountryObject,
> extends Readonly<
    Partial<
      ExtractPropTypes<ReturnType<typeof makePhoneInputMessagesProps<Country>>>
    >
  > {}

/**
 * Options for `usePhoneInputMessages` composable.
 *
 * @internal
 */
export interface VPhoneInputMessagesComposableOptions<
  Country extends VPhoneInputCountryObject,
> extends VPhoneInputExtractComposableOptions<
    VPhoneInputMessagesProps<Country>
  > {
  /**
   * Country to resolve messages with.
   */
  readonly country: MaybeRef<Country>;
}

/**
 * `usePhoneInputMessages` composable.
 *
 * @internal
 */
export interface VPhoneInputMessagesComposable<
  Country extends VPhoneInputCountryObject,
> {
  /**
   * Formatted example of phone number for current country.
   */
  readonly example: ComputedRef<string>;
  /**
   * Label for phone input.
   */
  readonly label: ComputedRef<string | undefined>;
  /**
   * `aria-label` for phone input.
   */
  readonly ariaLabel: ComputedRef<string | undefined>;
  /**
   * Label for country input.
   */
  readonly countryLabel: ComputedRef<string | undefined>;
  /**
   * `aria-label` for country input.
   */
  readonly countryAriaLabel: ComputedRef<string | undefined>;
  /**
   * Placeholder for phone input.
   */
  readonly placeholder: ComputedRef<string | undefined>;
  /**
   * Invalid message for phone input.
   */
  readonly invalidMessage: ComputedRef<string | undefined>;
  /**
   * Resolve a message using current context.
   */
  readonly resolveMessage: ComputedRef<
    <Message extends VPhoneInputMessage<Country> | null | undefined>(
      message: Message,
    ) => Message extends null | undefined ? string | undefined : string
  >;
}

/**
 * Options for `usePhoneInput` composable.
 *
 * @internal
 */
export interface VPhoneInputComposableOptions<
  Country extends VPhoneInputCountryObject,
> extends VPhoneInputExtractComposableOptions<
    Readonly<
      Partial<
        ExtractPropTypes<
          ReturnType<typeof makePhoneInputComposableProps<Country>>
        >
      >
    >
  > {
  /**
   * Phone model value ref, formatted using `modelFormat`.
   */
  modelValue: Ref<string | null | undefined>;
  /**
   * Country model value ref.
   */
  country?: Ref<string | null | undefined>;
  /**
   * Country input component or element ref to bind listeners to.
   */
  countryInputRef?: Ref<{ $el: HTMLElement } | HTMLElement | null | undefined>;
  /**
   * Phone input component or element ref to bind listeners to.
   */
  phoneInputRef?: Ref<{ $el: HTMLElement } | HTMLElement | null | undefined>;
}

/**
 * `usePhoneInput` composable.
 *
 * @internal
 */
export interface VPhoneInputComposable<Country extends VPhoneInputCountryObject>
  extends VPhoneInputCountryComposable<Country>,
    VPhoneInputMessagesComposable<Country> {
  /**
   * Country input component or element ref on which listeners are bound.
   */
  countryInputRef: Ref<{ $el: HTMLElement } | HTMLElement | null | undefined>;
  /**
   * Phone input component or element ref on which listeners are bound.
   */
  phoneInputRef: Ref<{ $el: HTMLElement } | HTMLElement | null | undefined>;
  /**
   * Phone input value.
   */
  phone: Ref<string | null>;
  /**
   * Country object value (computed from country input value).
   */
  countryObject: WritableComputedRef<Country>;
  /**
   * Phone object value (computed from phone input value).
   */
  phoneObject: ComputedRef<ParsedPhoneNumber | null>;
  /**
   * Phone object valid state (might be null if validation is disabled).
   */
  phoneValid: ComputedRef<boolean | null>;
  /**
   * Tells if a country is currently guessing.
   */
  countryGuessing: Readonly<Ref<boolean>>;
  /**
   * Trigger phone input value formatting.
   */
  formatPhoneInputValue: () => void;
}

/**
 * Available implementation for country input component (either `VSelect` or `VAutocomplete`).
 *
 * @internal
 */
export type VPhoneCountryInputComponent = typeof VSelect | typeof VAutocomplete;

/**
 * Component properties for country display components.
 *
 * @internal
 */
export interface VPhoneCountryDisplayProps<
  Country extends VPhoneInputCountryObject,
> extends Readonly<
    ExtractPropTypes<
      ReturnType<typeof makePhoneInputCountryDisplayProps<Country>>
    >
  > {}

/**
 * Component props for `VPhoneInput` (without models properties).
 *
 * @internal
 */
export interface VPhoneInputNonModelProps<
  Country extends VPhoneInputCountryObject,
  CountryInputComponent extends VPhoneCountryInputComponent,
> extends Readonly<
    Partial<
      ExtractPropTypes<
        ReturnType<typeof makePhoneInputProps<Country, CountryInputComponent>>
      >
    >
  > {}

/**
 * Component props for `VPhoneInput`.
 *
 * @internal
 */
export interface VPhoneInputProps<
  Country extends VPhoneInputCountryObject,
  CountryInputComponent extends VPhoneCountryInputComponent,
> extends VPhoneInputNonModelProps<Country, CountryInputComponent> {
  /**
   * Current phone number, formatted using `modelFormat`.
   */
  modelValue?: string | null | undefined;
  /**
   * Currently selected country.
   */
  country?: string | null | undefined;
}

/**
 * Component events for `VPhoneInput` (without models events).
 *
 * @internal
 */
export interface VPhoneInputNonModelEmits<
  Country extends VPhoneInputCountryObject,
> {
  /**
   * Country object value has been updated (computed from country input value).
   */
  "update:country-object": [value: Country];
  /**
   * Phone object value has been updated (computed from phone input value).
   */
  "update:phone-object": [value: ParsedPhoneNumber | null];
}

/**
 * Component events for `VPhoneInput`.
 *
 * @internal
 */
export interface VPhoneInputEmits<Country extends VPhoneInputCountryObject>
  extends VPhoneInputNonModelEmits<Country> {
  /**
   * Current phone number has been updated.
   */
  "update:model-value": [string | null | undefined];
  /**
   * Currently selected country has been updated.
   */
  "update:country": [string];
}

/**
 * Component slots forwarded to `VSelect` or `VAutocomplete`.
 *
 * @interface
 *
 * @internal
 */
export type VPhoneInputForwardedSlots<
  CountryInputComponent extends VPhoneCountryInputComponent,
> = {
  [K in keyof ComponentSlots<CountryInputComponent> as K extends string
    ? `country-input:${K}`
    : never]: ComponentSlots<CountryInputComponent>[K];
} & {
  [K in keyof ComponentSlots<typeof VTextField>]: ComponentSlots<
    typeof VTextField
  >[K];
};

/**
 * Component direct slots for `VPhoneInput`.
 *
 * @interface
 *
 * @internal
 */
export interface VPhoneInputCountrySlots<
  Country extends VPhoneInputCountryObject,
> {
  /**
   * Country display.
   *
   * @remarks
   * `decorative` tells if the display should be ignored by screen readers or
   * if it must have an accessible name (e.g. through `title` attribute).
   *
   * @defaultValue
   * Country display component from `countryDisplayComponent` property if available,
   * `'+<country.dialCode>'` otherwise.
   */
  readonly "country-display":
    | ((scope: { country: Country; decorative: boolean }) => VNode[])
    | undefined;

  /**
   * Country list item title.
   *
   * @defaultValue
   * `'<country.name>'`
   */
  readonly "country-name":
    | ((scope: { country: Country }) => VNode[])
    | undefined;

  /**
   * Country list item prepended content.
   *
   * @defaultValue
   * Use the `country-icon` slot with a decorative purpose.
   */
  readonly "country-prepend":
    | ((scope: { country: Country }) => VNode[])
    | undefined;

  /**
   * Country list item appended content.
   *
   * @defaultValue
   * `'+<country.dialCode>'` if `countryIconMode` property, `country-icon` or
   * `country-prepend` is defined, nothing otherwise.
   */
  readonly "country-append":
    | ((scope: { country: Country }) => VNode[])
    | undefined;
}

/**
 * Component slots for `VPhoneInput`.
 *
 * @interface
 *
 * @internal
 */
export type VPhoneInputSlots<
  Country extends VPhoneInputCountryObject,
  CountryComponent extends VPhoneCountryInputComponent,
> = Readonly<
  Partial<
    VPhoneInputCountrySlots<Country> &
      VPhoneInputForwardedSlots<CountryComponent>
  >
>;

/**
 * Component exposed values for `VPhoneInput`.
 *
 * @internal
 */
export interface VPhoneInputExposed<
  Country extends VPhoneInputCountryObject,
  CountryComponent extends VPhoneCountryInputComponent,
> {
  /**
   * Ref to the country input component.
   */
  readonly countryInputRef: ShallowRef<CountryComponent | undefined>;
  /**
   * Ref to the phone input component.
   */
  readonly phoneInputRef: ShallowRef<VTextField | undefined>;
  /**
   * Current phone object value.
   */
  readonly countryObject: ComputedRef<Country>;
  /**
   * Current phone object value.
   */
  readonly phoneObject: ComputedRef<ParsedPhoneNumber | null>;
  /**
   * Forwarded phone input's `VTextField.isValid` exposed value.
   */
  readonly isValid: ComputedRef<boolean | null>;
  /**
   * Forwarded phone input's `VTextField.errorMessages` exposed value.
   */
  readonly errorMessages: ComputedRef<string[]>;
  /**
   * Forwarded phone input's `VTextField.reset` exposed function.
   */
  readonly reset: () => Promise<void>;
  /**
   * Forwarded phone input's `VTextField.resetValidation` exposed function.
   */
  readonly resetValidation: () => Promise<void>;
  /**
   * Forwarded phone input's `VTextField.validate` exposed function.
   */
  readonly validate: (silent?: boolean) => Promise<string[]>;
}

/**
 * Injectable options for `VPhoneInput` and `usePhoneInput`.
 *
 * @internal
 */
export interface VPhoneInputPluginOptions<
  Country extends VPhoneInputCountryObject,
  CountryInputComponent extends VPhoneCountryInputComponent,
> extends VPhoneInputNonModelProps<Country, CountryInputComponent> {}
