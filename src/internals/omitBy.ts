/**
 * Omit keys from object by predicate.
 *
 * @param object
 * @param predicate
 *
 * @internal
 */
export default function omitBy<T extends {}, K extends keyof T>(
  object: T,
  predicate: (key: K) => boolean,
) {
  return Object.fromEntries(
    Object.keys(object)
      .filter(
        (key): key is string & keyof T => key in object && predicate(key as K),
      )
      .map((key) => [key, object[key]]),
  ) as Omit<T, K>;
}
