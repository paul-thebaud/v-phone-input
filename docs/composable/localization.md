# Labels localization

VPhoneInput ships with english appropriate labels:

- Label for the phone input: `"Phone"`;
- `aria-label` for the country input: `"Country for "<label>""` (where `<label>` is the
  current phone input's label);
- Invalid message for the phone input:
  `The "<label>" field is not a valid phone number (example: <example>).` (where `<label>` is the
  current phone input's label, and `<example>` is an appropriate phone number example for the
  current country).

To customize your labels, you use multiple properties or options:

- `label`: the phone input's label;
- `ariaLabel`: the phone input's `aria-label`;
- `countryLabel`: the country input's label;
- `countryAriaLabel`: the country input's `aria-label`;
- `invalidMessage`: the phone input's invalid state message;
- `placeholder`: the phone input's `placeholder`;
- `hint`: the phone input's `hint` (specific to Vuetify component).

You can customize those label inside your plugin definition, the component properties
or the composable options. Each label may be a string, a resolver function or a `null` value
to disable the label. Resolver function will receive a context object as their only parameter,
containing the current `label`, `country` and `example`.

Here are multiple examples of localization:

::: code-group

<<< ../snippets/composable/LabelsLocalization.vue [SignInForm.vue]

```ts [app.ts]
const vPhoneInput = createVPhoneInput({
  countryLabel: 'Country',
  // Disable a label.
  countryAriaLabel: null,
  // Use a label resolver.
  placeholder: ({ example }) => example, 
});
```

```ts [composable.ts]
const { phone } = usePhoneInput({
  countryLabel: 'Country',
  // Disable a label.
  countryAriaLabel: null,
  // Use a label resolver.
  placeholder: ({ example }) => example, 
});
```

:::
