import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import App from '../../dev/App';

describe('App.vue', () => {
  const localVue = createLocalVue();
  let vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('should be a vue instance', () => {
    const wrapper = mount(App, {
      localVue,
      vuetify,
    });

    expect(wrapper.vm).toBeTruthy();
  });
});
