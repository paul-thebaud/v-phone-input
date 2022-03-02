describe('InstallCard.vue', () => {
  it('should display title and description', () => {
    cy.visitDemo();

    cy.dataCy('install-card')
      .contains('h2', 'Installation');
    cy.dataCy('install-card')
      .contains('You can install the package through Yarn or NPM.');
  });

  it('should copy yarn command and show alert', () => {
    cy.visitDemo();

    cy.dataCy('install-card')
      .contains('Yarn add copied to clipboard.')
      .should('not.exist');

    cy.dataCy('install-card')
      .find('button[title="Copy Yarn add to clipboard"]')
      .click();

    cy.dataCy('install-card')
      .contains('Yarn add copied to clipboard.');
  });

  it('should copy npm command and show alert', () => {
    cy.visitDemo();

    cy.dataCy('install-card')
      .contains('NPM install copied to clipboard.')
      .should('not.exist');

    cy.dataCy('install-card')
      .find('button[title="Copy NPM install to clipboard"]')
      .click();

    cy.dataCy('install-card')
      .contains('NPM install copied to clipboard.');
  });
});
