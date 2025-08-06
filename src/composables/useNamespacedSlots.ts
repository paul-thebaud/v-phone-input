import { onBeforeMount, onBeforeUpdate, ref } from 'vue';

export default function useNamespacedSlots(
  slots: Record<string, any>,
  namespaces: string[],
) {
  const namespacedSlots = ref({} as Record<string, Record<string, string>>);

  const namespaceSlots = () => {
    const newNamespacedSlots = {} as Record<string, Record<string, string>>;

    Object.keys(slots).forEach((name) => {
      const [detectedNamespace, ...names] = name.split(':');
      if (!names.length || namespaces.indexOf(detectedNamespace) === -1) {
        newNamespacedSlots.default = {
          ...(newNamespacedSlots.default || {}),
          [name]: name,
        };
      } else {
        newNamespacedSlots[detectedNamespace] = {
          ...(newNamespacedSlots[detectedNamespace] || {}),
          [names.join(':')]: name,
        };
      }
    });

    namespacedSlots.value = newNamespacedSlots;
  };

  onBeforeMount(namespaceSlots);
  onBeforeUpdate(namespaceSlots);

  return { namespacedSlots };
}
