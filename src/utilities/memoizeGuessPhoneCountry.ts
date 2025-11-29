import { isRef, type Ref } from "vue";
import type { VPhoneInputCountryGuesserResult } from "../types";

/**
 * Create a memoized guess country function with memoization getter and setter.
 */
function memoizeGuessPhoneCountry<
  Guess extends () =>
    | Promise<VPhoneInputCountryGuesserResult>
    | VPhoneInputCountryGuesserResult,
>(
  guess: Guess,
  get: () => string | null,
  set: (value: string | null) => void,
): Guess & {
  memoized: string | null;
};

/**
 * Create a memoized guess country function with a memoization ref.
 */
function memoizeGuessPhoneCountry<
  Guess extends () =>
    | Promise<VPhoneInputCountryGuesserResult>
    | VPhoneInputCountryGuesserResult,
>(
  guess: Guess,
  ref: Ref<string | null>,
): Guess & {
  memoized: Ref<string | null>;
};

function memoizeGuessPhoneCountry<
  Guess extends () =>
    | Promise<VPhoneInputCountryGuesserResult>
    | VPhoneInputCountryGuesserResult,
>(
  guess: Guess,
  get: Ref<string | null> | (() => string | null),
  set?: (value: string | null) => void,
) {
  return Object.defineProperty(
    () => guess(),
    "memoized",
    isRef(get)
      ? {
          value: get,
        }
      : {
          get,
          set,
        },
  );
}

export default memoizeGuessPhoneCountry;
