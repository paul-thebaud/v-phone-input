import { VPhoneInput } from '@/entry.esm';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';

describe('VPhoneInput.vue', () => {
  const localVue = createLocalVue();
  let vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const makeVPhoneInput = () => mount(VPhoneInput, {
    localVue,
    vuetify,
  });

  it('should filter countries using onlyCountries', () => {
    const wrapper = makeVPhoneInput();
    wrapper.setProps({
      onlyCountries: ['FR', 'be'],
    });

    expect(wrapper.vm.sortedCountries.length === 2);
    expect(wrapper.vm.sortedCountries[0].iso2 === 'FR');
    expect(wrapper.vm.sortedCountries[1].iso2 === 'BE');
  });
});
