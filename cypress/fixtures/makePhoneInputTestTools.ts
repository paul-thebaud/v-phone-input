import type { ExtractPropTypes } from "vue";
import type { VPhoneInputCountryObject } from "../../src";
import type makePhoneInputComposableProps from "../../src/props/makePhoneInputComposableProps";

type MountProps = {
  country?: string;
  modelValue?: string;
} & Omit<
  Readonly<
    Partial<
      ExtractPropTypes<
        ReturnType<
          typeof makePhoneInputComposableProps<VPhoneInputCountryObject>
        >
      >
    >
  >,
  "country" | "modelValue" | "countryInputRef" | "phoneInputRef"
> &
  Record<string, unknown>;

type PhoneInputTestTools = {
  name: string;
  mount: (props?: MountProps) => void;
  selectCountry: (country: string) => void;
  typePhone: (text: string) => void;
  expectCountry: (country: string) => void;
  expectCountrySelectable: (country: string) => void;
  expectCountryNotSelectable: (country: string) => void;
  expectPhone: (text: string) => void;
  expectError: (text: string | null) => void;
};

export default function makePhoneInputTestTools<T extends PhoneInputTestTools>(
  tools: T,
) {
  return tools;
}
