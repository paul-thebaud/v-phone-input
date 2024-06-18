import '@cypress/code-coverage/support';

import './commands';

// @ts-ignore
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('ResizeObserver')) {
    return false;
  }
});
