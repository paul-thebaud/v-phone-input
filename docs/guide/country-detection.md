# Country detection

<feature-tags component composable />

By default, VPhoneInput will use the first country of the list as the default
country if no country is defined or detected from the phone number.

If you want, you can provide a [`guessCountry`](/api/interfaces/VPhoneInputProps#guessCountry)
property or option. VPhoneInput provides [`guessPhoneCountry`](/api/functions/guessPhoneCountry),
which will detect the user's country from its IP address using
[IP2C service](https://about.ip2c.org/).

```ts [app.ts]
// [!code ++]
import { guessPhoneCountry } from 'v-phone-input';

const vPhoneInput = createVPhoneInput({
  // [!code ++]
  guessCountry: guessPhoneCountry,
});
```

::: warning

In the past, country guessing was enabled by default inside VPhoneInput using IP2C service.
The service produced multiple timeout errors, so we changed this behavior to be disabled by default.
You should be aware that using a third-party service like this one may result in errors, even
if VPhoneInput's implementation catch error by using the first country inside the list.

:::

::: tip

To define you own country guesser, you can inspire from
[`guessPhoneCountry` implementation](https://github.com/paul-thebaud/v-phone-input/blob/main/src/utilities/guessPhoneCountry.ts).

:::

## Memoizing

Sometimes, you should memoize the country guessed or preferred by a user
(e.g. saving to the local storage or any other data store). For this, VPhoneInput
provides [`memoizeGuessPhoneCountry`](/api/functions/memoizeGuessPhoneCountry), which takes
a country guesser function, a getter, a setter, and returns a memoized counterpart.
During the country initialization, VPhoneInput will try to use the memoized value before
calling the country guesser. When the user select another country, VPhoneInput will
set the memoized country of the country guesser, to restore it to the user next times.

In the following example, country is memoized using the browser's
[`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

```ts [app.ts]
import { guessPhoneCountry, memoizeGuessPhoneCountry } from 'v-phone-input';

const vPhoneInput = createVPhoneInput({
  guessCountry: memoizeGuessPhoneCountry(
    guessPhoneCountry,
    () => window.localStorage.getItem('phone_country'),
    (country) => {
      if (country) {
        window.localStorage.setItem('phone_country', country);
      }
    },
  ),
});
```

You can also use a Vue ref to manage the memoized value (for example, using a watcher).

```ts [app.ts]
import { guessPhoneCountry, memoizeGuessPhoneCountry } from 'v-phone-input';

const meomizedCountry = ref<string>();

const vPhoneInput = createVPhoneInput({
  guessCountry: memoizeGuessPhoneCountry(
    guessPhoneCountry,
    meomizedCountry,
  ),
});
```
