import { computed, unref, type UnwrapRef } from "vue";
import injectPhoneInputPluginOptions from "../internals/injectPhoneInputPluginOptions.ts";
import undefinedBoolean from "../internals/undefinedBoolean.ts";
import type { VPhoneCountryInputComponent, VPhoneInputCountryObject } from "../types.ts";

/**
 * Composable to use injected options with currently passed properties or options.
 *
 * @internal
 */
export default function usePhoneInputPluginOptions<
  Country extends VPhoneInputCountryObject = VPhoneInputCountryObject,
  CountryInputComponent extends
    VPhoneCountryInputComponent = VPhoneCountryInputComponent,
>() {
  const injected = injectPhoneInputPluginOptions<
    Country,
    CountryInputComponent
  >();

  const getOption = <
    K extends keyof T & keyof typeof injected,
    T,
    D = undefined,
  >(
    key: K,
    options: T,
    defaultValue?: D,
  ):
    | Exclude<UnwrapRef<T[K]> | UnwrapRef<(typeof injected)[K]>, undefined>
    | D => {
    const aValue = unref(options[key]) as UnwrapRef<T[K]>;
    if (aValue === undefined || aValue === undefinedBoolean) {
      const bValue = unref(injected[key]) as UnwrapRef<(typeof injected)[K]>;
      if (bValue === undefined || bValue === undefinedBoolean) {
        return defaultValue as D;
      }

      return bValue as Exclude<UnwrapRef<(typeof injected)[K]>, undefined>;
    }

    return aValue as Exclude<UnwrapRef<T[K]>, undefined>;
  };

  return {
    getOption,
    useOption: <K extends keyof T & keyof typeof injected, T, D = undefined>(
      key: K,
      options: T,
      defaultValue?: D,
    ) => computed(() => getOption(key, options, defaultValue)),
  };
}
