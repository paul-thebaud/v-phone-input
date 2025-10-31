import { mount } from "@vue/test-utils";
import { expect } from "vitest";
import { createVuetify } from "vuetify/framework";
import { selectPhoneCountryInput, VPhoneInput } from "../../src";

describe("VPhoneInput", () => {
  const vuetify = createVuetify();

  test("mounts correctly", () => {
    const input = mount(VPhoneInput, {
      props: { ...selectPhoneCountryInput },
      global: {
        plugins: [vuetify],
      },
    });

    input.get('[data-test="phone-input"] input').setValue("0750123456");

    expect(input.vm.phoneObject?.valid).toBeTruthy();
    expect(input.vm.phoneObject?.number?.input).toStrictEqual("0750123456");
  });
});
