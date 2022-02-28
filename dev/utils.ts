// eslint-disable-next-line import/prefer-default-export
export function titleCase(text: string) {
  const result = text.replace(/([A-Z])/g, ' $1');

  return result.charAt(0).toUpperCase() + result.slice(1);
}
