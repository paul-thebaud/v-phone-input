# Country autocomplete

<feature-tags component />

[`VPhoneInput`](/api/variables/VPhoneInput) supports VAutocomplete input for current phone's country.
To use an autocomplete country input, you can use
[`autocompletePhoneCountryInput`](/api/variables/autocompletePhoneCountryInput)
instead of [`selectPhoneCountryInput`](/api/variables/selectPhoneCountryInput).
The following example is a global configuration using plugin
[`createVPhoneInput`](/api/functions/createVPhoneInput)

```ts [app.ts]
// [!code --]
import { selectPhoneCountryInput } from 'v-phone-input';
// [!code ++]
import { autocompletePhoneCountryInput } from 'v-phone-input';

const vPhoneInput = createVPhoneInput({
  // [!code --]
  ...selectPhoneCountryInput,
  // [!code ++]
  ...autocompletePhoneCountryInput,
});
```
