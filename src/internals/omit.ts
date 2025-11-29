/**
 * Omit keys from object.
 *
 * @param object
 * @param keys
 *
 * @internal
 */
export default function omit<T extends {}, K extends string & keyof T>(
  object: T,
  keys: readonly K[],
) {
  return Object.fromEntries(
    Object.keys(object)
      .filter(
        (key): key is string & keyof T =>
          key in object && (keys as readonly string[]).indexOf(key) === -1,
      )
      .map((key) => [key, object[key]]),
  ) as Omit<T, K>;
}
