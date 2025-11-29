import type {
  VPhoneInputCountryObject,
  VPhoneInputMessage,
  VPhoneInputMessageFactoryContext,
} from "../types";

/**
 * Resolve a message string or factory function.
 *
 * @param message
 * @param context
 *
 * @internal
 */
export default function resolveMessage<
  Country extends VPhoneInputCountryObject,
  Label extends string | undefined,
  Example extends string | undefined,
  Message extends
    | VPhoneInputMessage<Country, Label, Example>
    | null
    | undefined,
>(
  message: Message,
  context: VPhoneInputMessageFactoryContext<Country, Label, Example>,
): Message extends null | undefined ? string | undefined : string {
  return typeof message === "function"
    ? message(context)
    : // biome-ignore lint/suspicious/noExplicitAny: TypeScript low support for conditional types.
      (message ?? (undefined as any));
}
