import { VPhoneInput } from '@/entry.esm';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';

describe('VPhoneInput.vue', () => {
  const makeVPhoneInput = (options = {}) => mount(VPhoneInput, {
    localVue: createLocalVue(),
    vuetify: new Vuetify(),
    ...options,
  });

  it('should use all countries', () => {
    const wrapper = makeVPhoneInput();

    expect(wrapper.vm.sortedCountries.length).toEqual(250);
    expect(wrapper.vm.sortedCountries.find((c) => c.iso2 === 'FR' || c.iso2 === 'BE')).toBeTruthy();
    expect(wrapper.vm.sortedCountries.find((c) => c.iso2 === 'AF')).toBeTruthy();
  });

  it('should filter countries using onlyCountries', () => {
    const wrapper = makeVPhoneInput({
      propsData: { onlyCountries: ['FR', 'be'] },
    });

    expect(wrapper.vm.sortedCountries.length).toEqual(2);
    expect(wrapper.vm.sortedCountries.find((c) => c.iso2 === 'FR' || c.iso2 === 'BE')).toBeTruthy();
    expect(wrapper.vm.sortedCountries.find((c) => c.iso2 === 'AF')).toBeFalsy();
  });

  it('should filter countries using ignoredCountries', () => {
    const wrapper = makeVPhoneInput({
      propsData: { ignoredCountries: ['FR', 'be'] },
    });

    expect(wrapper.vm.sortedCountries.length).toEqual(248);
    expect(wrapper.vm.sortedCountries.find((c) => c.iso2 === 'FR' || c.iso2 === 'BE')).toBeFalsy();
    expect(wrapper.vm.sortedCountries.find((c) => c.iso2 === 'AF')).toBeTruthy();
  });
});
