import { Country } from '@/types/countries';
import { Message, MessageOptions, MessageResolver } from '@/types/options';
import { computed, ComputedRef } from 'vue';

interface UseLabelsParams {
  props: {
    label: MessageResolver;
    ariaLabel: MessageResolver;
    countryLabel: MessageResolver;
    countryAriaLabel: MessageResolver;
    placeholder: MessageResolver;
    hint: MessageResolver;
    invalidMessage: MessageResolver;
  };
  country: ComputedRef<Country>;
  example: ComputedRef<string>;
}

export default function useLabels({ props, country, example }: UseLabelsParams) {
  const computeMessage = (message: MessageResolver, options: MessageOptions): Message => (
    typeof message === 'function' ? message(options) : message
  );

  const messageOptions = computed(() => ({ country: country.value, example: example.value }));

  const label = computed(() => computeMessage(props.label, messageOptions.value));
  const ariaLabel = computed(() => computeMessage(props.ariaLabel, messageOptions.value));

  const fullMessageOptions = computed(() => ({
    ...messageOptions.value, label: label.value || ariaLabel.value,
  }));

  const countryLabel = computed(() => computeMessage(props.countryLabel, fullMessageOptions.value));
  const countryAriaLabel = computed(
    () => computeMessage(props.countryAriaLabel, fullMessageOptions.value),
  );
  const placeholder = computed(() => computeMessage(props.placeholder, fullMessageOptions.value));
  const hint = computed(() => computeMessage(props.hint, fullMessageOptions.value));
  const invalidMessage = computed(
    () => computeMessage(props.invalidMessage, fullMessageOptions.value),
  );

  return {
    label,
    ariaLabel,
    countryLabel,
    countryAriaLabel,
    placeholder,
    hint,
    invalidMessage,
    messageOptions,
  };
}
