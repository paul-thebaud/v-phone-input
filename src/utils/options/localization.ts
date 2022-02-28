import { CountryAriaLabelResolver, InvalidMessageResolver } from '@/types/options';

const computeCountryAriaLabel: CountryAriaLabelResolver = ({ label }) => `Country for ${label}`;
const computeInvalidMessage: InvalidMessageResolver = ({ label, example }) => `The "${label}" field is not a valid phone number (example: ${example}).`;

export default {
  label: 'Phone',
  countryLabel: 'Country',
  computeCountryAriaLabel,
  computeInvalidMessage,
};
