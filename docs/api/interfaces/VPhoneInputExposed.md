[v-phone-input](../globals.md) / VPhoneInputExposed

# Interface: VPhoneInputExposed\<Country, CountryComponent\>

Defined in: dist/types.d.ts:419

**`Internal`**

Component exposed values for `VPhoneInput`.

## Type Parameters

### Country

`Country` *extends* [`VPhoneInputCountryObject`](VPhoneInputCountryObject.md)

### CountryComponent

`CountryComponent` *extends* [`VPhoneCountryInputComponent`](../type-aliases/VPhoneCountryInputComponent.md)

## Properties

### countryInputRef

> `readonly` **countryInputRef**: `ShallowRef`\<`CountryComponent` \| `undefined`\>

Defined in: dist/types.d.ts:423

Ref to the country input component.

***

### countryObject

> `readonly` **countryObject**: `ComputedRef`\<`Country`\>

Defined in: dist/types.d.ts:431

Current phone object value.

***

### errorMessages

> `readonly` **errorMessages**: `ComputedRef`\<`string`[]\>

Defined in: dist/types.d.ts:443

Forwarded phone input's `VTextField.errorMessages` exposed value.

***

### isValid

> `readonly` **isValid**: `ComputedRef`\<`boolean` \| `null`\>

Defined in: dist/types.d.ts:439

Forwarded phone input's `VTextField.isValid` exposed value.

***

### phoneInputRef

> `readonly` **phoneInputRef**: `ShallowRef`\<`CreateComponentPublicInstanceWithMixins`\<`object` & `object` & `object` & `object` & `object`, [`HTMLInputElement`](https://developer.mozilla.org/docs/Web/API/HTMLInputElement) & [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<[`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`object` & [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<\{ `centerAffix`: `boolean`; `density`: `Density`; `direction`: `"horizontal"` \| `"vertical"`; `disabled`: `boolean` \| `null`; `error`: `boolean`; `errorMessages`: `string` \| readonly ...[] \| `null`; `focused`: `boolean`; `glow`: `boolean`; `hideSpinButtons`: `boolean`; `maxErrors`: `string` \| `number`; `messages`: `string` \| readonly ...[]; `persistentHint`: `boolean`; `readonly`: `boolean` \| `null`; `rules`: readonly (... \| ... \| ... \| ... \| ... \| ... \| ...)[]; `style`: `StyleValue`; \}\> & [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`object` & `object`, `"validate"` \| `"centerAffix"` \| `"density"` \| `"direction"` \| `"disabled"` \| `"error"` \| `"errorMessages"` \| `"focused"` \| `"glow"` \| `"hideSpinButtons"` \| `"isValid"` \| `"maxErrors"` \| `"messages"` \| `"persistentHint"` \| `"readonly"` \| `"reset"` \| `"resetValidation"` \| `"rules"` \| `"style"`\> & `ShallowUnwrapRef`\<\{ `errorMessages`: `ComputedRef`\<...[]\>; `isValid`: `ComputedRef`\<... \| ... \| ...\>; `reset`: () => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<...\>; `resetValidation`: () => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<...\>; `validate`: (`silent?`) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<...\>; \}\> & `ComponentCustomProperties` & `GenericProps`\<\{ `modelValue?`: `unknown`; `onUpdate:modelValue?`: (`value`) => ...; \}, `VInputSlots`\>, `"label"` \| `"centerAffix"` \| `"density"` \| `"direction"` \| `"disabled"` \| `"error"` \| `"errorMessages"` \| `"focused"` \| `"glow"` \| `"hideSpinButtons"` \| `"id"` \| `"maxErrors"` \| `"messages"` \| `"name"` \| `"persistentHint"` \| `"readonly"` \| `"rules"` \| `"style"` \| `"width"` \| `"theme"` \| `"class"` \| `"onUpdate:focused"` \| `"modelValue"` \| `"validateOn"` \| `"validationValue"` \| `"maxWidth"` \| `"minWidth"` \| `"appendIcon"` \| `"prependIcon"` \| `"hideDetails"` \| `"hint"` \| `"onClick:prepend"` \| `"onClick:append"` \| `"color"` \| `"baseColor"` \| `"iconColor"` \| `"$children"` \| `"v-slots"` \| `"v-slot:append"` \| `"v-slot:default"` \| `"v-slot:details"` \| `"v-slot:message"` \| `"v-slot:prepend"` \| `"onUpdate:modelValue"` \| keyof VNodeProps\>, `` `$${any}` ``\> & [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<[`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`object` & [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<\{ `active`: `boolean`; `centerAffix`: `boolean`; `clearable`: `boolean`; `clearIcon`: `IconValue`; `details`: `boolean`; `dirty`: `boolean`; `disabled`: `boolean`; `error`: `boolean`; `flat`: `boolean`; `focused`: `boolean`; `glow`: `boolean`; `persistentClear`: `boolean`; `reverse`: `boolean`; `rounded`: `string` \| `number` \| `boolean`; `singleLine`: `boolean`; `style`: `StyleValue`; `tile`: `boolean`; `variant`: `"filled"` \| `"outlined"` \| `"plain"` \| `"solo"` \| `"solo-filled"` \| `"solo-inverted"` \| `"underlined"`; \}\> & [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`object` & `object` & `object`, `"active"` \| `"centerAffix"` \| `"clearIcon"` \| `"clearable"` \| `"controlRef"` \| `"dirty"` \| `"disabled"` \| `"error"` \| `"fieldIconColor"` \| `"flat"` \| `"focused"` \| `"glow"` \| `"persistentClear"` \| `"reverse"` \| `"rounded"` \| `"singleLine"` \| `"style"` \| `"tile"` \| `"variant"` \| `"details"`\> & `ShallowUnwrapRef`\<\{ `controlRef`: `Ref`\<... \| ..., ... \| ...\>; `fieldIconColor`: `ComputedRef`\<... \| ...\>; \}\> & `ComponentCustomProperties` & `GenericProps`\<\{ `modelValue?`: `unknown`; `onUpdate:modelValue?`: (`value`) => ...; \}, `VFieldSlots`\>, `"label"` \| `"active"` \| `"centerAffix"` \| `"clearIcon"` \| `"clearable"` \| `"dirty"` \| `"disabled"` \| `"error"` \| `"flat"` \| `"focused"` \| `"glow"` \| `"id"` \| `"persistentClear"` \| `"reverse"` \| `"rounded"` \| `"singleLine"` \| `"style"` \| `"tile"` \| `"variant"` \| `"theme"` \| `"class"` \| `"onUpdate:focused"` \| `"modelValue"` \| `"loading"` \| `"appendInnerIcon"` \| `"bgColor"` \| `"color"` \| `"baseColor"` \| `"iconColor"` \| `"prependInnerIcon"` \| `"onClick:clear"` \| `"onClick:appendInner"` \| `"onClick:prependInner"` \| `"$children"` \| `"v-slots"` \| `"v-slot:append-inner"` \| `"v-slot:clear"` \| `"v-slot:default"` \| `"v-slot:label"` \| `"v-slot:loader"` \| `"v-slot:prepend-inner"` \| `"onUpdate:modelValue"` \| keyof VNodeProps \| `"details"`\>, `` `$${any}` ``\> & `object`, `unknown`, \{ \}, \{ \}, `ComponentOptionsMixin`, `ComponentOptionsMixin`, \{ `click:control`: (`e`) => `true`; `mousedown:control`: (`e`) => `true`; `update:focused`: (`focused`) => `true`; `update:modelValue`: (`val`) => `true`; \}, `VNodeProps` & `AllowedComponentProps` & `ComponentCustomProps`, \{ `active`: `boolean`; `autofocus`: `boolean`; `centerAffix`: `boolean`; `clearable`: `boolean`; `clearIcon`: `IconValue`; `density`: `Density`; `direction`: `"horizontal"` \| `"vertical"`; `dirty`: `boolean`; `disabled`: `boolean`; `error`: `boolean`; `errorMessages`: `string` \| readonly `string`[] \| `null`; `flat`: `boolean`; `focused`: `boolean`; `glow`: `boolean`; `hideSpinButtons`: `boolean`; `maxErrors`: `string` \| `number`; `messages`: `string` \| readonly `string`[]; `persistentClear`: `boolean`; `persistentCounter`: `boolean`; `persistentHint`: `boolean`; `persistentPlaceholder`: `boolean`; `readonly`: `boolean` \| `null`; `reverse`: `boolean`; `rounded`: `string` \| `number` \| `boolean`; `rules`: readonly (`string` \| `boolean` \| `PromiseLike`\<`ValidationResult`\> \| \[`string`, `any`, `string`?\] \| (`value`) => `ValidationResult` \| (`value`) => `PromiseLike`\<`ValidationResult`\>)[]; `singleLine`: `boolean`; `style`: `StyleValue`; `tile`: `boolean`; `type`: `string`; `variant`: `"filled"` \| `"outlined"` \| `"plain"` \| `"solo"` \| `"solo-filled"` \| `"solo-inverted"` \| `"underlined"`; \}, `true`, \{ \}, `SlotsType`\<[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<\{ `append`: (`arg`) => `VNode`\<`RendererNode`, `RendererElement`, \{\[`key`: `string`\]: `any`; \}\>[]; `append-inner`: (`arg`) => `VNode`\<`RendererNode`, `RendererElement`, \{\[`key`: `string`\]: `any`; \}\>[]; `clear`: (`arg`) => `VNode`\<`RendererNode`, `RendererElement`, \{\[`key`: `string`\]: `any`; \}\>[]; `counter`: (`arg`) => `VNode`\<`RendererNode`, `RendererElement`, \{\[`key`: `string`\]: `any`; \}\>[]; `default`: () => `VNode`\<`RendererNode`, `RendererElement`, \{\[`key`: `string`\]: `any`; \}\>[]; `details`: (`arg`) => `VNode`\<`RendererNode`, `RendererElement`, \{\[`key`: `string`\]: `any`; \}\>[]; `label`: (`arg`) => `VNode`\<`RendererNode`, `RendererElement`, \{\[`key`: `string`\]: `any`; \}\>[]; `loader`: (`arg`) => `VNode`\<`RendererNode`, `RendererElement`, \{\[`key`: `string`\]: `any`; \}\>[]; `message`: (`arg`) => `VNode`\<`RendererNode`, `RendererElement`, \{\[`key`: `string`\]: `any`; \}\>[]; `prepend`: (`arg`) => `VNode`\<`RendererNode`, `RendererElement`, \{\[`key`: `string`\]: `any`; \}\>[]; `prepend-inner`: (`arg`) => `VNode`\<`RendererNode`, `RendererElement`, \{\[`key`: `string`\]: `any`; \}\>[]; \}\>\>, `GlobalComponents`, `GlobalDirectives`, `string`, \{ \}, `any`, `ComponentProvideOptions`, \{ `B`: \{ \}; `C`: \{ \}; `D`: \{ \}; `Defaults`: \{ \}; `M`: \{ \}; `P`: \{ \}; \}, `object` & `object` & `object` & `object` & `object`, [`HTMLInputElement`](https://developer.mozilla.org/docs/Web/API/HTMLInputElement) & [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<[`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`object` & [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<\{ `centerAffix`: `boolean`; `density`: `Density`; `direction`: `"horizontal"` \| `"vertical"`; `disabled`: `boolean` \| `null`; `error`: `boolean`; `errorMessages`: `string` \| readonly ...[] \| `null`; `focused`: `boolean`; `glow`: `boolean`; `hideSpinButtons`: `boolean`; `maxErrors`: `string` \| `number`; `messages`: `string` \| readonly ...[]; `persistentHint`: `boolean`; `readonly`: `boolean` \| `null`; `rules`: readonly (... \| ... \| ... \| ... \| ... \| ... \| ...)[]; `style`: `StyleValue`; \}\> & [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`object` & `object`, `"validate"` \| `"centerAffix"` \| `"density"` \| `"direction"` \| `"disabled"` \| `"error"` \| `"errorMessages"` \| `"focused"` \| `"glow"` \| `"hideSpinButtons"` \| `"isValid"` \| `"maxErrors"` \| `"messages"` \| `"persistentHint"` \| `"readonly"` \| `"reset"` \| `"resetValidation"` \| `"rules"` \| `"style"`\> & `ShallowUnwrapRef`\<\{ `errorMessages`: `ComputedRef`\<...[]\>; `isValid`: `ComputedRef`\<... \| ... \| ...\>; `reset`: () => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<...\>; `resetValidation`: () => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<...\>; `validate`: (`silent?`) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<...\>; \}\> & `ComponentCustomProperties` & `GenericProps`\<\{ `modelValue?`: `unknown`; `onUpdate:modelValue?`: (`value`) => ...; \}, `VInputSlots`\>, `"label"` \| `"centerAffix"` \| `"density"` \| `"direction"` \| `"disabled"` \| `"error"` \| `"errorMessages"` \| `"focused"` \| `"glow"` \| `"hideSpinButtons"` \| `"id"` \| `"maxErrors"` \| `"messages"` \| `"name"` \| `"persistentHint"` \| `"readonly"` \| `"rules"` \| `"style"` \| `"width"` \| `"theme"` \| `"class"` \| `"onUpdate:focused"` \| `"modelValue"` \| `"validateOn"` \| `"validationValue"` \| `"maxWidth"` \| `"minWidth"` \| `"appendIcon"` \| `"prependIcon"` \| `"hideDetails"` \| `"hint"` \| `"onClick:prepend"` \| `"onClick:append"` \| `"color"` \| `"baseColor"` \| `"iconColor"` \| `"$children"` \| `"v-slots"` \| `"v-slot:append"` \| `"v-slot:default"` \| `"v-slot:details"` \| `"v-slot:message"` \| `"v-slot:prepend"` \| `"onUpdate:modelValue"` \| keyof VNodeProps\>, `` `$${any}` ``\> & [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<[`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`object` & [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<\{ `active`: `boolean`; `centerAffix`: `boolean`; `clearable`: `boolean`; `clearIcon`: `IconValue`; `details`: `boolean`; `dirty`: `boolean`; `disabled`: `boolean`; `error`: `boolean`; `flat`: `boolean`; `focused`: `boolean`; `glow`: `boolean`; `persistentClear`: `boolean`; `reverse`: `boolean`; `rounded`: `string` \| `number` \| `boolean`; `singleLine`: `boolean`; `style`: `StyleValue`; `tile`: `boolean`; `variant`: `"filled"` \| `"outlined"` \| `"plain"` \| `"solo"` \| `"solo-filled"` \| `"solo-inverted"` \| `"underlined"`; \}\> & [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`object` & `object` & `object`, `"active"` \| `"centerAffix"` \| `"clearIcon"` \| `"clearable"` \| `"controlRef"` \| `"dirty"` \| `"disabled"` \| `"error"` \| `"fieldIconColor"` \| `"flat"` \| `"focused"` \| `"glow"` \| `"persistentClear"` \| `"reverse"` \| `"rounded"` \| `"singleLine"` \| `"style"` \| `"tile"` \| `"variant"` \| `"details"`\> & `ShallowUnwrapRef`\<\{ `controlRef`: `Ref`\<... \| ..., ... \| ...\>; `fieldIconColor`: `ComputedRef`\<... \| ...\>; \}\> & `ComponentCustomProperties` & `GenericProps`\<\{ `modelValue?`: `unknown`; `onUpdate:modelValue?`: (`value`) => ...; \}, `VFieldSlots`\>, `"label"` \| `"active"` \| `"centerAffix"` \| `"clearIcon"` \| `"clearable"` \| `"dirty"` \| `"disabled"` \| `"error"` \| `"flat"` \| `"focused"` \| `"glow"` \| `"id"` \| `"persistentClear"` \| `"reverse"` \| `"rounded"` \| `"singleLine"` \| `"style"` \| `"tile"` \| `"variant"` \| `"theme"` \| `"class"` \| `"onUpdate:focused"` \| `"modelValue"` \| `"loading"` \| `"appendInnerIcon"` \| `"bgColor"` \| `"color"` \| `"baseColor"` \| `"iconColor"` \| `"prependInnerIcon"` \| `"onClick:clear"` \| `"onClick:appendInner"` \| `"onClick:prependInner"` \| `"$children"` \| `"v-slots"` \| `"v-slot:append-inner"` \| `"v-slot:clear"` \| `"v-slot:default"` \| `"v-slot:label"` \| `"v-slot:loader"` \| `"v-slot:prepend-inner"` \| `"onUpdate:modelValue"` \| keyof VNodeProps \| `"details"`\>, `` `$${any}` ``\> & `object`, \{ \}, \{ \}, \{ \}, \{ `active`: `boolean`; `autofocus`: `boolean`; `centerAffix`: `boolean`; `clearable`: `boolean`; `clearIcon`: `IconValue`; `density`: `Density`; `direction`: `"horizontal"` \| `"vertical"`; `dirty`: `boolean`; `disabled`: `boolean`; `error`: `boolean`; `errorMessages`: `string` \| readonly `string`[] \| `null`; `flat`: `boolean`; `focused`: `boolean`; `glow`: `boolean`; `hideSpinButtons`: `boolean`; `maxErrors`: `string` \| `number`; `messages`: `string` \| readonly `string`[]; `persistentClear`: `boolean`; `persistentCounter`: `boolean`; `persistentHint`: `boolean`; `persistentPlaceholder`: `boolean`; `readonly`: `boolean` \| `null`; `reverse`: `boolean`; `rounded`: `string` \| `number` \| `boolean`; `rules`: readonly (`string` \| `boolean` \| `PromiseLike`\<`ValidationResult`\> \| \[`string`, `any`, `string`?\] \| (`value`) => `ValidationResult` \| (`value`) => `PromiseLike`\<`ValidationResult`\>)[]; `singleLine`: `boolean`; `style`: `StyleValue`; `tile`: `boolean`; `type`: `string`; `variant`: `"filled"` \| `"outlined"` \| `"plain"` \| `"solo"` \| `"solo-filled"` \| `"solo-inverted"` \| `"underlined"`; \}\> \| `undefined`\>

Defined in: dist/types.d.ts:427

Ref to the phone input component.

***

### phoneObject

> `readonly` **phoneObject**: `ComputedRef`\<[`ParsedPhoneNumber`](https://github.com/grantila/awesome-phonenumber?tab=readme-ov-file#basic-usage) \| `null`\>

Defined in: dist/types.d.ts:435

Current phone object value.

***

### reset()

> `readonly` **reset**: () => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: dist/types.d.ts:447

Forwarded phone input's `VTextField.reset` exposed function.

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### resetValidation()

> `readonly` **resetValidation**: () => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: dist/types.d.ts:451

Forwarded phone input's `VTextField.resetValidation` exposed function.

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### validate()

> `readonly` **validate**: (`silent?`) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`[]\>

Defined in: dist/types.d.ts:455

Forwarded phone input's `VTextField.validate` exposed function.

#### Parameters

##### silent?

`boolean`

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`[]\>
