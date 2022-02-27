import plugin, * as elements from '@/entry.esm';

type NamedExports = Exclude<typeof elements, 'default'>;
type ExtendedPlugin = typeof plugin & NamedExports;

Object.entries(elements).forEach(([elementName, element]) => {
  if (elementName !== 'default') {
    const key = elementName as Exclude<keyof NamedExports, 'default'>;
    (plugin as ExtendedPlugin)[key] = element as Exclude<ExtendedPlugin, typeof plugin>;
  }
});

export default plugin;
