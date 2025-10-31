[v-phone-input](../globals.md) / VPhoneInputCountryGuesser

# Interface: VPhoneInputCountryGuesser()

Defined in: dist/types.d.ts:56

**`Internal`**

Country guesser function.

> **VPhoneInputCountryGuesser**(): [`VPhoneInputCountryGuesserResult`](../type-aliases/VPhoneInputCountryGuesserResult.md) \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`VPhoneInputCountryGuesserResult`](../type-aliases/VPhoneInputCountryGuesserResult.md)\>

Defined in: dist/types.d.ts:60

Guess a country.

## Returns

[`VPhoneInputCountryGuesserResult`](../type-aliases/VPhoneInputCountryGuesserResult.md) \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`VPhoneInputCountryGuesserResult`](../type-aliases/VPhoneInputCountryGuesserResult.md)\>

## Properties

### memoized?

> `optional` **memoized**: `MaybeRef`\<`string` \| `null` \| `undefined`\>

Defined in: dist/types.d.ts:69

Previously memoized country two-letter code.

#### Remarks

Property should only be available when the country guesser function supports memoization.
It is set to memoize the currently selected country.
It is retrieved to avoid running guesser function when a memoized country is available.
