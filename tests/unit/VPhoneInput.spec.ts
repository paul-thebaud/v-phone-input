import { Ip2cCountryGuesser, VPhoneInput } from '@/index';
import { createLocalVue, mount } from '@vue/test-utils';
import { beforeAll, describe, expect, it } from 'vitest';
import Vuetify from 'vuetify';
import fakeIp2cFetch from './utils/fakeIp2cFetch';

describe('VPhoneInput.vue', () => {
  const wait = (delay: number) => new Promise((r) => {
    setTimeout(r, delay);
  });

  const makeVPhoneInput = (options: any = {}) => mount(VPhoneInput, {
    localVue: createLocalVue(),
    vuetify: new Vuetify(),
    ...options,
    propsData: {
      countryGuesser: new Ip2cCountryGuesser(),
      ...(options.propsData || {}),
    },
  });

  beforeAll(() => {
    fakeIp2cFetch();
  });

  it('should use all countries', () => {
    const wrapper = makeVPhoneInput();

    expect(wrapper.vm.countriesItems.length).toEqual(250);
    expect(wrapper.vm.countriesItems.find((c: any) => c.iso2 === 'FR' || c.iso2 === 'BE')).toBeTruthy();
    expect(wrapper.vm.countriesItems.find((c: any) => c.iso2 === 'AF')).toBeTruthy();
    expect(wrapper.vm.countriesItems.find((c: any) => c.divider === true)).toBeFalsy();
  });

  it('should filter countries using onlyCountries', () => {
    const wrapper = makeVPhoneInput({
      propsData: { onlyCountries: ['FR', 'be'] },
    });

    expect(wrapper.vm.countriesItems.length).toEqual(2);
    expect(wrapper.vm.countriesItems.find((c: any) => c.iso2 === 'FR' || c.iso2 === 'BE')).toBeTruthy();
    expect(wrapper.vm.countriesItems.find((c: any) => c.iso2 === 'AF')).toBeFalsy();
    expect(wrapper.vm.countriesItems.find((c: any) => c.divider === true)).toBeFalsy();
  });

  it('should filter countries using ignoredCountries', () => {
    const wrapper = makeVPhoneInput({
      propsData: { ignoredCountries: ['FR', 'be'] },
    });

    expect(wrapper.vm.countriesItems.length).toEqual(248);
    expect(wrapper.vm.countriesItems.find((c: any) => c.iso2 === 'FR' || c.iso2 === 'BE')).toBeFalsy();
    expect(wrapper.vm.countriesItems.find((c: any) => c.iso2 === 'AF')).toBeTruthy();
    expect(wrapper.vm.countriesItems.find((c: any) => c.divider === true)).toBeFalsy();
  });

  it('should use the only one country', async () => {
    const wrapper = makeVPhoneInput({
      propsData: { onlyCountries: ['AF'] },
    });

    await wait(50);

    expect(wrapper.vm.countriesItems.length).toEqual(1);
    expect(wrapper.vm.lazyCountry).toEqual('AF');
  });

  it('should prepend preferred countries with divider', () => {
    const wrapper = makeVPhoneInput({
      propsData: { preferredCountries: ['FR', 'be'] },
    });

    expect(wrapper.vm.countriesItems.length).toEqual(251);
    expect(wrapper.vm.countriesItems.find((c: any) => c.iso2 === 'FR' || c.iso2 === 'BE')).toBeTruthy();
    expect(wrapper.vm.countriesItems.find((c: any) => c.iso2 === 'AF')).toBeTruthy();
    expect(wrapper.vm.countriesItems.find((c: any) => c.divider === true)).toBeTruthy();
  });

  it('should prepend preferred countries without divider', () => {
    const wrapper = makeVPhoneInput({
      propsData: { preferredCountries: ['FR', 'be'], onlyCountries: ['FR', 'BE'] },
    });

    expect(wrapper.vm.countriesItems.length).toEqual(2);
    expect(wrapper.vm.countriesItems.find((c: any) => c.iso2 === 'FR' || c.iso2 === 'BE')).toBeTruthy();
    expect(wrapper.vm.countriesItems.find((c: any) => c.iso2 === 'AF')).toBeFalsy();
    expect(wrapper.vm.countriesItems.find((c: any) => c.divider === true)).toBeFalsy();
  });

  it('should only use custom rules', async () => {
    let functionRuleParams = [] as unknown[];
    const wrapper = makeVPhoneInput({
      propsData: {
        invalidMessage: null,
        rules: [
          'foo',
          (...args: unknown[]) => {
            functionRuleParams = args;
            return true;
          },
        ],
      },
    });

    await wait(50);

    const { mergedRules } = wrapper.vm;
    expect(mergedRules.length).toEqual(2);
    expect(mergedRules[0]).toEqual('foo');
    expect(mergedRules[1]).toBeDefined();
    expect(functionRuleParams).toBeDefined();
    expect(functionRuleParams[0]).toEqual('');
    expect(functionRuleParams[1]).toEqual({
      number: { input: '' },
      possibility: 'unknown',
      possible: false,
      regionCode: 'FR',
      valid: false,
    });
    expect(functionRuleParams[2]).toEqual({
      label: 'Phone',
      example: '01 23 45 67 89',
    });
  });

  it('should use country prop for lazy country init', async () => {
    const wrapper = makeVPhoneInput({ propsData: { country: 'AF' } });

    expect(wrapper.vm.lazyCountry).toEqual('AF');

    await wait(50);

    expect(wrapper.vm.lazyCountry).toEqual('AF');
  });

  it('should use country prop for lazy country update', async () => {
    const wrapper = makeVPhoneInput();

    await wait(50);

    expect(wrapper.vm.lazyCountry).toEqual('FR');

    await wrapper.setProps({ country: 'AF' });

    expect(wrapper.vm.lazyCountry).toEqual('AF');
  });
});
