// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-plugin-snapshots/commands';

Cypress.Commands.add('visitDemo', (ipCountry) => {
  console.log(ipCountry);
  cy.visit('/', {
    onBeforeLoad(win) {
      cy.stub(win, 'fetch').withArgs('https://ip2c.org/s')
        .resolves({
          ok: true,
          text: () => Promise.resolve(ipCountry ? `1;${ipCountry}` : '0'),
        });
    },
  });
});
