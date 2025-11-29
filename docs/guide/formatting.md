# Phone formatting

<feature-tags component composable />

By default, VPhoneInput will format phone number on input
[`blur` event](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event) using
`national` format. It will also emit phone number using `e164` format on each input.
Finally, examples displayed inside the [phone labels](/guide/localization) will use `national`
format.

Each of those formats can be customized to a valid
[
`PhoneNumberFormat`](https://github.com/grantila/awesome-phonenumber?tab=readme-ov-file#phone-number-formats)
using the appropriate properties or options:

- [`displayFormat`](/api/interfaces/VPhoneInputProps#displayFormat) will change the format
  used for inner phone input value (shown to the user)
- [`modelFormat`](/api/interfaces/VPhoneInputProps#modelFormat) will change the format
  used for internal phone input value (e.g. passed through `v-model`)
- [`exampleFormat`](/api/interfaces/VPhoneInputProps#exampleFormat) defaults to
  `displayFormat`, and will change the format used for examples inside labels (e.g. invalid message)

```ts [app.ts]
const vPhoneInput = createVPhoneInput({
  // [!code ++:3]
  displayFormat: 'international',
  modelFormat: 'rfc3966',
  exampleFormat: 'international',
});
```

::: warning
Using a `modelFormat` which does not hold country dial code, such as `national`, will make your
phone number string lose its country awareness. Prefer using another format if you are not storing
the country aside, such as `e164`, `rfc3966` or `international`.
:::

## Formatting after a delay

To disable on `blur` formatting, you can pass `false` to the
[`displayFormatOnBlur`](/api/interfaces/VPhoneInputProps#displayFormatOnBlur) property.
When disabling on `blur` formatting, the phone number will be formatted after a fixed delay
without any user input, which can be customized using
[`displayFormatDelay`](/api/interfaces/VPhoneInputProps#displayFormatDelay)
(by default, `1000ms`). You can also let `displayFormatOnBlur` enabled to combine both behaviors.

```ts [app.ts]
const vPhoneInput = createVPhoneInput({
  // [!code ++:2]
  displayFormatOnBlur: false,
  displayFormatDelay: 1000, // Default behavior when disabling on-blur formatting.
});
```

::: info
Passing a `0` delay will trigger phone number formatting on each input.
:::

::: danger
Prefer using on `blur` phone formatting, because delayed formatting might format
the phone while the user is still typing a phone number.
:::

## Disabling formatting

To disable any formatting, you can pass a `null` value to any formatting property (.

```ts [app.ts]
const vPhoneInput = createVPhoneInput({
  // [!code ++]
  displayFormat: null,
});
```
