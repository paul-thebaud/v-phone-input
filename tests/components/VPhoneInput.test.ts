import { mount } from "@vue/test-utils";
import type { ParsedPhoneNumber } from "awesome-phonenumber";
import { expect } from "vitest";
import { defineComponent, h, ref, shallowRef } from "vue";
import { type VSelect } from "vuetify/components";
import { createVuetify } from "vuetify/framework";
import {
  createVPhoneInput,
  memoizeGuessPhoneCountry,
  providePhoneInputOptions,
  selectPhoneCountryInput,
  VPhoneInput,
  type VPhoneInputCountryObject,
} from "../../src";

describe("VPhoneInput", () => {
  const vuetify = createVuetify();

  it("mounts correctly without plugin", async () => {
    const input = mount(VPhoneInput, {
      props: { ...selectPhoneCountryInput },
      global: {
        plugins: [vuetify],
      },
    });

    await input
      .get('.v-phone-input__phone__input input[type="tel"]')
      .setValue("0750123456");

    expect(input.vm.phoneObject?.valid).toStrictEqual(true);
    expect(input.vm.phoneObject?.number?.input).toStrictEqual("0750123456");
  });

  it("mounts correctly with plugin", async () => {
    const vPhoneInput = createVPhoneInput({
      ...selectPhoneCountryInput,
    });

    const Component = defineComponent({
      setup: () => ({ phoneInputRef: shallowRef() }),
      template: '<v-phone-input ref="phoneInputRef" />',
    });

    const input = mount(Component, {
      global: {
        plugins: [vuetify, vPhoneInput],
      },
    });

    await input
      .get('.v-phone-input__phone__input input[type="tel"]')
      .setValue("0750123456");

    expect(input.vm.phoneInputRef.phoneObject?.valid).toStrictEqual(true);
    expect(input.vm.phoneInputRef.phoneObject?.number?.input).toStrictEqual(
      "0750123456",
    );
  });

  it("mounts correctly with provide", async () => {
    const Component = defineComponent({
      setup: (_, { expose }) => {
        const phoneInputRef = shallowRef();

        providePhoneInputOptions({
          ...selectPhoneCountryInput,
        });

        expose({ phoneInputRef });

        return () =>
          h(VPhoneInput<VPhoneInputCountryObject, typeof VSelect>, {
            ref: phoneInputRef,
          });
      },
    });

    const input = mount(Component, {
      global: {
        plugins: [vuetify],
      },
    });

    await input
      .get('.v-phone-input__phone__input input[type="tel"]')
      .setValue("0750123456");

    const { phoneInputRef } = input.vm as unknown as {
      phoneInputRef: { phoneObject: ParsedPhoneNumber };
    };

    expect(phoneInputRef.phoneObject?.valid).toStrictEqual(true);
    expect(phoneInputRef.phoneObject?.number?.input).toStrictEqual(
      "0750123456",
    );
  });

  it("memoizes country: get/set", async () => {
    const store = { value: null as string | null };

    const input = mount(VPhoneInput, {
      props: {
        ...selectPhoneCountryInput,
        guessCountry: memoizeGuessPhoneCountry(
          () => null,
          () => store.value,
          (c) => {
            store.value = c;
          },
        ),
      },
      global: {
        plugins: [vuetify],
      },
    });

    expect(input.vm.countryObject?.iso2).toStrictEqual("AF");
    expect(store.value).toBeNull();

    await input.getComponent({ name: "VSelect" }).setValue("FR");

    expect(input.vm.countryObject?.iso2).toStrictEqual("FR");
    expect(store.value).toStrictEqual("FR");
  });

  it("memoizes country: ref", async () => {
    const valueRef = ref(null as string | null);

    const input = mount(VPhoneInput, {
      props: {
        ...selectPhoneCountryInput,
        guessCountry: memoizeGuessPhoneCountry(() => null, valueRef),
      },
      global: {
        plugins: [vuetify],
      },
    });

    expect(input.vm.countryObject?.iso2).toStrictEqual("AF");
    expect(valueRef.value).toBeNull();

    await input.getComponent({ name: "VSelect" }).setValue("FR");

    expect(input.vm.countryObject?.iso2).toStrictEqual("FR");
    expect(valueRef.value).toStrictEqual("FR");
  });

  it("exposes valid phone data", async () => {
    const input = mount(VPhoneInput, {
      props: {
        ...selectPhoneCountryInput,
        displayFormatDelay: 0,
      },
      global: {
        plugins: [vuetify],
      },
    });

    await input
      .get('.v-phone-input__phone__input input[type="tel"]')
      .setValue("+33612345678");

    expect(
      input.vm.countryInputRef?.$el.classList.contains(
        "v-phone-input__country__input",
      ),
    ).toStrictEqual(true);
    expect(
      input.vm.phoneInputRef?.$el.classList.contains(
        "v-phone-input__phone__input",
      ),
    ).toStrictEqual(true);

    expect(input.vm.countryObject?.iso2).toStrictEqual("FR");
    expect(input.vm.phoneObject?.valid).toStrictEqual(true);
    expect(input.vm.phoneObject?.number?.input).toStrictEqual("06 12 34 56 78");

    expect(input.vm.isValid).toStrictEqual(true);
    expect(input.vm.errorMessages).toStrictEqual([]);

    expect(input.vm.reset).toBeTypeOf("function");
    expect(input.vm.resetValidation).toBeTypeOf("function");
    expect(input.vm.validate).toBeTypeOf("function");
  });

  it("exposes invalid phone data", async () => {
    const input = mount(VPhoneInput, {
      props: {
        ...selectPhoneCountryInput,
        displayFormatDelay: 0,
      },
      global: {
        plugins: [vuetify],
      },
    });

    await input
      .get('.v-phone-input__phone__input input[type="tel"]')
      .setValue("+33712345678");

    expect(
      input.vm.countryInputRef?.$el.classList.contains(
        "v-phone-input__country__input",
      ),
    ).toStrictEqual(true);
    expect(
      input.vm.phoneInputRef?.$el.classList.contains(
        "v-phone-input__phone__input",
      ),
    ).toStrictEqual(true);

    expect(input.vm.countryObject?.iso2).toStrictEqual("FR");
    expect(input.vm.phoneObject?.valid).toStrictEqual(false);
    expect(input.vm.phoneObject?.number?.input).toStrictEqual("+33712345678");

    expect(input.vm.isValid).toStrictEqual(false);
    expect(input.vm.errorMessages).toStrictEqual([
      'The "Phone" field is not a valid phone number (example: 01 23 45 67 89).',
    ]);

    expect(input.vm.reset).toBeTypeOf("function");
    expect(input.vm.resetValidation).toBeTypeOf("function");
    expect(input.vm.validate).toBeTypeOf("function");
  });
});
