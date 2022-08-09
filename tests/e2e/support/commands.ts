import * as compareSnapshotCommand from 'cypress-image-diff-js/dist/command';

compareSnapshotCommand();

// @ts-ignore
Cypress.Commands.add('dataCy', (value) => cy.get(`[data-cy=${value}]`));

// @ts-ignore
Cypress.Commands.add('containsCountryTitle', { prevSubject: true }, (subject: JQuery<HTMLElement>, value) => {
  const icon = cy.wrap(subject.find('.v-phone-input__country__icon'));

  icon.should((i) => {
    console.log(i.attr('title'));
    expect(i).to.have.attr('role', 'img');
    expect(i).to.have.attr('title').contains(value);
  });

  return icon;
});

// @ts-ignore
Cypress.Commands.add('visitDemo', (ipCountry = undefined, config = {}) => {
  cy.visit(`/${ipCountry ? '?guess=1' : ''}`, {
    onBeforeLoad(win) {
      cy.stub(win, 'fetch').withArgs('https://ip2c.org/s')
        .resolves({
          ok: true,
          text: () => Promise.resolve(ipCountry ? `1;${ipCountry}` : '0'),
        });

      if (config.onBeforeLoad) {
        (config.onBeforeLoad as (w: any) => void)(win);
      }
    },
  });

  cy.document().its('fonts.status').should('equal', 'loaded');
});
