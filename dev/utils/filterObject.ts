export default function filterObject<T>(
  source: Record<string, T>,
  predicate: (value: T, prop: string) => boolean,
): Record<string, T> {
  return Object.keys(source).reduce((newSource, prop) => {
    if (predicate(source[prop], prop)) {
      return { ...newSource, [prop]: source[prop] };
    }

    return newSource;
  }, {} as Record<string, T>);
}
