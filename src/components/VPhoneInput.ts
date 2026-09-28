import type { PublicProps, ShallowUnwrapRef, VNode } from "vue";
import type { VSelect } from "vuetify/components";
import type {
  VPhoneCountryInputComponent,
  VPhoneInputCountryObject,
  VPhoneInputEmits,
  VPhoneInputExposed,
  VPhoneInputProps,
  VPhoneInputSlots,
} from "../types.ts";
import VPhoneInputSFC from "./VPhoneInput.vue";

// biome-ignore lint/suspicious/noExplicitAny: This type alias requires any.
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type VPhoneInputComponent = <
  Country extends VPhoneInputCountryObject = VPhoneInputCountryObject,
  CountryInputComponent extends VPhoneCountryInputComponent = typeof VSelect,
>(
  props: NonNullable<Awaited<typeof setup>>["props"],
  ctx?: Pick<NonNullable<Awaited<typeof setup>>, "attrs" | "emit" | "slots">,
  expose?: NonNullable<Awaited<typeof setup>>["expose"],
  setup?: Promise<{
    props: VPhoneInputProps<Country, CountryInputComponent> & PublicProps;
    expose(
      exposed: ShallowUnwrapRef<
        VPhoneInputExposed<Country, CountryInputComponent>
      >,
    ): void;
    // biome-ignore lint/suspicious/noExplicitAny: Support any attribute.
    attrs: any;
    slots: VPhoneInputSlots<Country, CountryInputComponent>;
    emit: UnionToIntersection<
      {
        [K in keyof VPhoneInputEmits<Country>]: (
          event: K,
          ...args: VPhoneInputEmits<Country>[K]
        ) => void;
      }[keyof VPhoneInputEmits<Country>]
    >;
  }>,
) => VNode & {
  __ctx?: Awaited<typeof setup>;
};

// biome-ignore lint/suspicious/noExplicitAny: Ignore SFC real type.
const VPhoneInput: VPhoneInputComponent = VPhoneInputSFC as any;

export default VPhoneInput;
