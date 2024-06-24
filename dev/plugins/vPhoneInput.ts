import { createVPhoneInput } from '@/index';
import '@/scss/v-phone-input.scss';
import 'flag-icons/css/flag-icons.min.css';
import 'world-flags-sprite/stylesheets/flags32.css';

// eslint-disable-next-line no-underscore-dangle
declare const __E2E_TEST__: boolean | undefined;

export default createVPhoneInput({
  includeCountries: __E2E_TEST__ ? ['AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'FR'] : [],
});
