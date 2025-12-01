# Phone validation

<feature-tags component composable />

By default, VPhoneInput will ensure that
[`ParsedPhoneNumber.valid`](https://github.com/grantila/awesome-phonenumber?tab=readme-ov-file#basic-usage)
is `true`, and that
[`ParsedPhoneNumber.regionCode`](https://github.com/grantila/awesome-phonenumber?tab=readme-ov-file#basic-usage)
matches the currently selected country.

Additionally, it will append an additional rule when using the Vuetify component,
which will print [`invalidMessage`](/api/interfaces/VPhoneInputProps#invalidMessage)
when facing an invalid phone number.

::: info
Please note that empty phone number is considered valid. If you need to ensure that phone number
input is filled, you'll have to use an additional rule.
:::

## Customizing validation

To customize the automatic validation of the phone input, you provide a
[`validate`](/api/interfaces/VPhoneInputProps#validate) property or option, which takes a
`ParsedPhoneNumber` and returns a boolean.

For example, you may want to accept emergency numbers using `ParsedPhoneNumber.shortValid`.
Here is the default `validate` behavior, but with a support for short numbers:

```ts [app.ts]
const vPhoneInput = createVPhoneInput({
  validate: (phone, country) => {
    if (!phone) {
      return true;
    }
    
    if (phone.regionCode !== country.iso2) {
      return false;
    }
    
    // [!code warning]
    return phone.valid || phone.shortValid;
  },
});
```

::: tip

To customize the `invalidMessage` displayed when the phone number is not valid, you check out
the [labels localization guide](/guide/localization).

:::

## Disabling validation

To disable automatic validation, you pass `null` to the `validate` property or option. It will
disable rule appending inside the Vuetify component. It will also make the composable's `phoneValid`
returned property a `null` value.

```ts [app.ts]
const vPhoneInput = createVPhoneInput({
  // [!code ++]
  validate: null,
});
```
