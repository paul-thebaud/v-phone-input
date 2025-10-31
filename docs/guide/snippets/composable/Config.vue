<script
  lang="ts"
  setup
>
import { usePhoneInput } from 'v-phone-input';
import { toRef } from 'vue';

const props = defineProps<{
  label?: string;
}>();

const country = defineModel<string>();
const modelValue = defineModel<string>();

const {
  // ...
} = usePhoneInput({
  // Mandatory reactive options.
  country,
  modelValue,
  // Maybe reactive options.
  label: toRef(props, 'label'),
  displayFormat: 'e164',
});
</script>
