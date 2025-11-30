import { getExample } from "awesome-phonenumber";
import { computed, unref } from "vue";
import formatPhoneObject from "../internals/formatPhoneObject";
import resolveMessage from "../internals/resolveMessage";
import type {
  VPhoneInputCountryObject,
  VPhoneInputMessage,
  VPhoneInputMessageFactoryContext,
  VPhoneInputMessagesComposable,
  VPhoneInputMessagesComposableOptions,
} from "../types";
import usePhoneInputPluginOptions from "./usePhoneInputPluginOptions.ts";

/**
 * Composable to manage phone input messages.
 *
 * @param options
 *
 * @internal
 */
export default function usePhoneInputMessages<
  Country extends VPhoneInputCountryObject,
>(
  options: VPhoneInputMessagesComposableOptions<Country>,
): VPhoneInputMessagesComposable<Country> {
  const { useOption } = usePhoneInputPluginOptions<Country>();

  const exampleFormatOption = useOption(
    "exampleFormat",
    options,
    "national" as const,
  );
  const exampleOption = useOption("example", options, () =>
    formatPhoneObject(
      exampleFormatOption.value,
      getExample(country.value.iso2),
    ),
  );
  const labelOption = useOption("label", options, "Phone");
  const ariaLabelOption = useOption("ariaLabel", options);
  const countryLabelOption = useOption(
    "countryLabel",
    options,
    (ctx: VPhoneInputMessageFactoryContext<Country>) =>
      `Country for "${ctx.label}"`,
  );
  const countryAriaLabelOption = useOption("countryAriaLabel", options);
  const placeholderOption = useOption("placeholder", options);
  const invalidMessageOption = useOption(
    "invalidMessage",
    options,
    (ctx: VPhoneInputMessageFactoryContext<Country>) =>
      `The "${ctx.label}" field is not a valid phone number (example: ${ctx.example}).`,
  );

  const country = computed(() => unref(options.country));

  const example = computed(() =>
    resolveMessage(exampleOption.value, {
      country: country.value,
      example: undefined,
      label: undefined,
    }),
  );

  const label = computed(() =>
    resolveMessage(labelOption.value, {
      country: country.value,
      example: example.value,
      label: undefined,
    }),
  );

  const ariaLabel = computed(() =>
    resolveMessage(ariaLabelOption.value, {
      country: country.value,
      example: example.value,
      label: undefined,
    }),
  );

  const resolveMessageRef = computed(
    () =>
      <Message extends VPhoneInputMessage<Country> | null | undefined>(
        message: Message,
      ) =>
        resolveMessage(message, {
          country: country.value,
          example: example.value,
          label: label.value,
        }),
  );

  return {
    example,
    label,
    ariaLabel,
    countryLabel: computed(() =>
      resolveMessageRef.value(countryLabelOption.value),
    ),
    countryAriaLabel: computed(() =>
      resolveMessageRef.value(countryAriaLabelOption.value),
    ),
    placeholder: computed(() =>
      resolveMessageRef.value(placeholderOption.value),
    ),
    invalidMessage: computed(() =>
      resolveMessageRef.value(invalidMessageOption.value),
    ),
    resolveMessage: resolveMessageRef,
  };
}
