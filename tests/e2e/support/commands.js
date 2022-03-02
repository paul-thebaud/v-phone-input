// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-plugin-snapshots/commands';

Cypress.Commands.add('dataCy', (value) => cy.get(`[data-cy=${value}]`));

Cypress.Commands.add('visitDemo', (ipCountry = undefined, config = {}) => {
  cy.visit('/', {
    onBeforeLoad(win) {
      cy.stub(win, 'fetch').withArgs('https://ip2c.org/s')
        .resolves({
          ok: true,
          text: () => Promise.resolve(ipCountry ? `1;${ipCountry}` : '0'),
        });

      if (config.onBeforeLoad) {
        config.onBeforeLoad(win);
      }
    },
  });

  cy.document().then((doc) => {
    const $style = doc.createElement('style');
    $style.innerHTML = '#app.v-application, #app.v-application * { font-family: Helvetica !important; }';
    doc.head.appendChild($style);
  });

  cy.document().its('fonts.status').should('equal', 'loaded');
});
