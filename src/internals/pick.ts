/**
 * Pick keys from object.
 *
 * @param object
 * @param keys
 *
 * @internal
 */
export default function pick<T extends {}, K extends string & keyof T>(
  object: T,
  keys: readonly K[],
) {
  return Object.fromEntries(
    keys.filter((key) => key in object).map((key) => [key, object[key]]),
  ) as Pick<T, K>;
}
