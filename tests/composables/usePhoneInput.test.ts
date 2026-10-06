import { mount } from "@vue/test-utils";
import { expect } from "vitest";
import { defineComponent, ref } from "vue";
import { usePhoneInput } from "../../src";
import { V_PHONE_INPUT_INJECTION_KEY } from "../../src/internals/injectPhoneInputPluginOptions";

describe("usePhoneInput", () => {
  it("provides default options", () => {
    const wrapper = mount(
      defineComponent({
        template: "< />",
        setup: () =>
          usePhoneInput({
            modelValue: ref(),
          }),
      }),
    );

    // Countries.

    expect(wrapper.vm.countries.length).toStrictEqual(245);
    expect(wrapper.vm.preferredCountries.length).toStrictEqual(0);
    expect(wrapper.vm.unpreferredCountries.length).toStrictEqual(245);
    expect(wrapper.vm.countries[0]).toStrictEqual({
      iso2: "AF",
      dialCode: "93",
      name: "Afghanistan",
    });
    expect(wrapper.vm.countries[1]).toStrictEqual({
      iso2: "AX",
      dialCode: "358",
      name: "Åland Islands",
    });
    expect(wrapper.vm.defaultCountry).toBeNull();
    expect(wrapper.vm.fallbackCountry?.iso2).toStrictEqual("AF");

    // Messages.

    expect(wrapper.vm.example).toStrictEqual("070 123 4567");
    expect(wrapper.vm.label).toStrictEqual("Phone");
    expect(wrapper.vm.ariaLabel).toStrictEqual(undefined);
    expect(wrapper.vm.countryLabel).toStrictEqual('Country for "Phone"');
    expect(wrapper.vm.countryAriaLabel).toStrictEqual(undefined);
    expect(wrapper.vm.placeholder).toStrictEqual(undefined);
    expect(wrapper.vm.invalidMessage).toStrictEqual(
      'The "Phone" field is not a valid phone number (example: 070 123 4567).',
    );
  });

  it("supports overriding options", () => {
    const wrapper = mount(
      defineComponent({
        template: "< />",
        setup: () =>
          usePhoneInput({
            modelValue: ref(),
            example: () => "123",
            label: "Phone (custom)",
            ariaLabel: "Aria Phone (custom)",
            countryAriaLabel: null,
            placeholder: ({ example }) => `Placeholder ${example}`,
            invalidMessage: null,
          }),
      }),
      {
        global: {
          provide: {
            [V_PHONE_INPUT_INJECTION_KEY]: {
              ariaLabel: "Aria Phone (default)",
              countryLabel: "Country (default)",
              countryAriaLabel: "Aria Country (default)",
            },
          },
        },
      },
    );

    expect(wrapper.vm.example).toStrictEqual("123");
    expect(wrapper.vm.label).toStrictEqual("Phone (custom)");
    expect(wrapper.vm.ariaLabel).toStrictEqual("Aria Phone (custom)");
    expect(wrapper.vm.countryLabel).toStrictEqual("Country (default)");
    expect(wrapper.vm.countryAriaLabel).toBeUndefined();
    expect(wrapper.vm.placeholder).toStrictEqual("Placeholder 123");
    expect(wrapper.vm.invalidMessage).toBeUndefined();
  });

  it("prohibits empty countries list", () => {
    try {
      mount(
        defineComponent({
          template: "< />",
          setup: () =>
            usePhoneInput({
              modelValue: ref(),
              countries: [],
            }),
        }),
      );
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        "message",
        "[VPhoneInput] Countries list must contain at least one country.",
      );
    }
  });

  it("supports custom countries", () => {
    const fr = {
      iso2: "fr",
      iso3: "FRA",
      dialCode: "33",
      name: "France",
    };

    const be = {
      iso2: "be",
      iso3: "BEL",
      dialCode: "32",
      name: "Belgium",
    };

    const wrapper = mount(
      defineComponent({
        template: "< />",
        setup: () =>
          usePhoneInput({
            modelValue: ref(),
            countries: [fr, be],
          }),
      }),
    );

    expect(wrapper.vm.findCountry("AF")).toBeNull();
    expect(wrapper.vm.findCountry("fr")).toStrictEqual(fr);
    expect(wrapper.vm.findCountry("Fr")).toStrictEqual(fr);
    expect(wrapper.vm.findCountry("FR")).toStrictEqual(fr);
    expect(wrapper.vm.findCountry("BE")).toStrictEqual(be);
  });

  it("supports customizing exampleType", async () => {
    const exampleType = ref<"fixed-line" | "mobile">();

    const wrapper = mount(
      defineComponent({
        template: "< />",
        setup: () =>
          usePhoneInput({
            modelValue: ref(),
            defaultCountry: "FR",
            exampleType,
          }),
      }),
    );

    expect(wrapper.vm.example).toStrictEqual("06 12 34 56 78");
    expect(wrapper.vm.invalidMessage).toStrictEqual(
      'The "Phone" field is not a valid phone number (example: 06 12 34 56 78).',
    );

    exampleType.value = "fixed-line";
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.example).toStrictEqual("01 23 45 67 89");
    expect(wrapper.vm.invalidMessage).toStrictEqual(
      'The "Phone" field is not a valid phone number (example: 01 23 45 67 89).',
    );

    exampleType.value = "mobile";
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.example).toStrictEqual("06 12 34 56 78");
    expect(wrapper.vm.invalidMessage).toStrictEqual(
      'The "Phone" field is not a valid phone number (example: 06 12 34 56 78).',
    );
  });

  it("supports customizing exampleType via plugin options", () => {
    const wrapper = mount(
      defineComponent({
        template: "< />",
        setup: () =>
          usePhoneInput({
            modelValue: ref(),
            defaultCountry: "FR",
          }),
      }),
      {
        global: {
          provide: {
            [V_PHONE_INPUT_INJECTION_KEY]: {
              exampleType: "mobile",
            },
          },
        },
      },
    );

    expect(wrapper.vm.example).toStrictEqual("06 12 34 56 78");
  });
});
