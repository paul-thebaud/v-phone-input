export default function mapWithKey<T extends object, TKey extends string>(
  values: T[],
  key: keyof T,
): Record<TKey, T> {
  const map = {} as Record<TKey, T>;

  values.forEach((value) => {
    map[value[key] as unknown as TKey] = value;
  });

  return map;
}
