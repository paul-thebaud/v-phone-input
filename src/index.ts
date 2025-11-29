import "./scss/v-phone-input.scss";
import VPhoneCountryFlagSprite from "./components/VPhoneCountryFlagSprite";
import VPhoneCountryFlagSvg from "./components/VPhoneCountryFlagSvg";
import VPhoneInput from "./components/VPhoneInput.vue";
import usePhoneInput from "./composables/usePhoneInput";
import createVPhoneInput from "./createVPhoneInput";
import vPhoneInputSharedProperties from "./internals/vPhoneInputSharedProperties";
import autocompletePhoneCountryInput from "./utilities/autocompletePhoneCountryInput";
import guessPhoneCountry from "./utilities/guessPhoneCountry";
import memoizeGuessPhoneCountry from "./utilities/memoizeGuessPhoneCountry";
import providePhoneInputOptions from "./utilities/providePhoneInputOptions.ts";
import selectPhoneCountryInput from "./utilities/selectPhoneCountryInput";

export * from "./types";

export {
  VPhoneCountryFlagSvg,
  VPhoneCountryFlagSprite,
  VPhoneInput,
  usePhoneInput,
  createVPhoneInput,
  selectPhoneCountryInput,
  autocompletePhoneCountryInput,
  providePhoneInputOptions,
  guessPhoneCountry,
  memoizeGuessPhoneCountry,
  vPhoneInputSharedProperties,
};

declare module "vue" {
  export interface GlobalComponents {
    VPhoneInput: typeof VPhoneInput;
  }
}
