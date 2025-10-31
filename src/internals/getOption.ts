import { type UnwrapRef, unref } from "vue";
import undefinedBoolean from "./undefinedBoolean.ts";

export default function getOption<
  K extends keyof T & keyof U,
  T,
  U,
  D = undefined,
>(
  key: K,
  aOptions: T,
  bOptions: U,
  defaultValue?: D,
): Exclude<UnwrapRef<T[K]> | UnwrapRef<U[K]>, undefined> | D {
  const aValue = unref(aOptions[key]) as UnwrapRef<T[K]>;
  if (aValue === undefined || aValue === undefinedBoolean) {
    const bValue = unref(bOptions[key]) as UnwrapRef<U[K]>;
    if (bValue === undefined || bValue === undefinedBoolean) {
      return defaultValue as D;
    }

    return bValue as Exclude<UnwrapRef<U[K]>, undefined>;
  }

  return aValue as Exclude<UnwrapRef<T[K]>, undefined>;
}
