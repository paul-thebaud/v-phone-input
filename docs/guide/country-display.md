# Country display

<feature-tags component />

[`VPhoneInput`](/api/variables/VPhoneInput) country display customization
allows you to change the way country are shown within the select input selection,
or inside a select input list's item prepend slot. Currently, 3 built-in country
displays are available: dial code (default behavior), SVG and CSS Sprite.

::: info
If you do not define
[`countryInputComponent`](/api/interfaces/VPhoneInputProps#countryInputComponent-1),
the default behavior is to display the dial code of the country (e.g. `+33` for France).

When providing a country display component, the dial code will appear in the append slot of each
item in the country select list.
:::

## SVG (recommended)

SVG country display is the recommended option, as it provides a clear country flag icon using
SVG files. It requires [`flag-icons`](https://www.npmjs.com/package/flag-icons) package and
it is provided through [`VPhoneCountryFlagSvg`](/api/functions/VPhoneCountryFlagSvg).

### Installation

::: code-group

```sh [npm]
$ npm add flag-icons
```

```sh [pnpm]
$ pnpm add flag-icons
```

```sh [yarn]
$ yarn add flag-icons
```

```sh [bun]
$ bun add flag-icons
```

:::

### Configuration

```ts
// [!code ++:2]
import 'flag-icons/css/flag-icons.min.css';
import { VPhoneCountryFlagSvg } from 'v-phone-input';

const vPhoneInput = createVPhoneInput({
  // ...
  // [!code ++]
  countryDisplayComponent: VPhoneCountryFlagSvg,
});
```

## CSS sprite

Displays country using a CSS sprite. It requires
[`world-flags-sprite`](https://www.npmjs.com/package/world-flags-sprite) package and
it is provided through [
`VPhoneCountryFlagSprite`](/api/functions/VPhoneCountryFlagSprite).

### Installation

::: code-group

```sh [npm]
$ npm add world-flags-sprite
```

```sh [pnpm]
$ pnpm add world-flags-sprite
```

```sh [yarn]
$ yarn add world-flags-sprite
```

```sh [bun]
$ bun add world-flags-sprite
```

:::

### Configuration

```ts
// [!code ++:2]
import 'world-flags-sprite/stylesheets/flags32.css';
import { VPhoneCountryFlagSprite } from 'v-phone-input';

const vPhoneInput = createVPhoneInput({
  // ...
  // [!code ++]
  countryDisplayComponent: VPhoneCountryFlagSprite,
});
```

## Custom component

You may also want to define your own country display. For this, you can provide a custom component
to [`countryDisplayComponent`](/api/interfaces/VPhoneInputProps#countryDisplayComponent).
Component must support [`VPhoneCountryDisplayProps`](/api/interfaces/VPhoneCountryDisplayProps)
properties.

## Custom template

You can also pass a `country-display` slot the `VPhoneInput` component. The slot will receive the
same properties as if using a custom component.

<<< ./snippets/country-display/Slot.vue
