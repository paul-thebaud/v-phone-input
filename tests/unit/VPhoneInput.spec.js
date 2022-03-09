import { VPhoneInput } from '@/entry.esm';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';

describe('VPhoneInput.vue', () => {
  const wait = (delay) => new Promise((r) => {
    setTimeout(r, delay);
  });

  const mockFetch = () => {
    global.fetch = jest.fn(() => Promise.resolve({
      text: () => Promise.resolve('1;FR'),
    }));
  };

  const makeVPhoneInput = (options = {}) => mount(VPhoneInput, {
    localVue: createLocalVue(),
    vuetify: new Vuetify(),
    ...options,
  });

  it('should use all countries', () => {
    mockFetch();
    const wrapper = makeVPhoneInput();

    expect(wrapper.vm.countriesItems.length).toEqual(250);
    expect(wrapper.vm.countriesItems.find((c) => c.iso2 === 'FR' || c.iso2 === 'BE')).toBeTruthy();
    expect(wrapper.vm.countriesItems.find((c) => c.iso2 === 'AF')).toBeTruthy();
    expect(wrapper.vm.countriesItems.find((c) => c.divider === true)).toBeFalsy();
  });

  it('should filter countries using onlyCountries', () => {
    mockFetch();
    const wrapper = makeVPhoneInput({
      propsData: { onlyCountries: ['FR', 'be'] },
    });

    expect(wrapper.vm.countriesItems.length).toEqual(2);
    expect(wrapper.vm.countriesItems.find((c) => c.iso2 === 'FR' || c.iso2 === 'BE')).toBeTruthy();
    expect(wrapper.vm.countriesItems.find((c) => c.iso2 === 'AF')).toBeFalsy();
    expect(wrapper.vm.countriesItems.find((c) => c.divider === true)).toBeFalsy();
  });

  it('should filter countries using ignoredCountries', () => {
    mockFetch();
    const wrapper = makeVPhoneInput({
      propsData: { ignoredCountries: ['FR', 'be'] },
    });

    expect(wrapper.vm.countriesItems.length).toEqual(248);
    expect(wrapper.vm.countriesItems.find((c) => c.iso2 === 'FR' || c.iso2 === 'BE')).toBeFalsy();
    expect(wrapper.vm.countriesItems.find((c) => c.iso2 === 'AF')).toBeTruthy();
    expect(wrapper.vm.countriesItems.find((c) => c.divider === true)).toBeFalsy();
  });

  it('should prepend preferred countries with divider', () => {
    mockFetch();
    const wrapper = makeVPhoneInput({
      propsData: { preferredCountries: ['FR', 'be'] },
    });

    expect(wrapper.vm.countriesItems.length).toEqual(251);
    expect(wrapper.vm.countriesItems.find((c) => c.iso2 === 'FR' || c.iso2 === 'BE')).toBeTruthy();
    expect(wrapper.vm.countriesItems.find((c) => c.iso2 === 'AF')).toBeTruthy();
    expect(wrapper.vm.countriesItems.find((c) => c.divider === true)).toBeTruthy();
  });

  it('should prepend preferred countries without divider', () => {
    mockFetch();
    const wrapper = makeVPhoneInput({
      propsData: { preferredCountries: ['FR', 'be'], onlyCountries: ['FR', 'BE'] },
    });

    expect(wrapper.vm.countriesItems.length).toEqual(2);
    expect(wrapper.vm.countriesItems.find((c) => c.iso2 === 'FR' || c.iso2 === 'BE')).toBeTruthy();
    expect(wrapper.vm.countriesItems.find((c) => c.iso2 === 'AF')).toBeFalsy();
    expect(wrapper.vm.countriesItems.find((c) => c.divider === true)).toBeFalsy();
  });

  it('should only use custom rules', async () => {
    mockFetch();
    let functionRuleParams;
    const wrapper = makeVPhoneInput({
      propsData: {
        invalidMessage: null,
        rules: [
          'foo',
          (...args) => {
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
    mockFetch();
    const wrapper = makeVPhoneInput({ propsData: { country: 'AF' } });

    expect(wrapper.vm.lazyCountry).toEqual('AF');

    await wait(50);

    expect(wrapper.vm.lazyCountry).toEqual('AF');
  });

  it('should use country prop for lazy country update', async () => {
    mockFetch();
    const wrapper = makeVPhoneInput();

    await wait(50);

    expect(wrapper.vm.lazyCountry).toEqual('FR');

    await wrapper.setProps({ country: 'AF' });

    expect(wrapper.vm.lazyCountry).toEqual('AF');
  });
});
