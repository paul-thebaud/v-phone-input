describe('AppHeader.vue', () => {
  it('should display package name and description', () => {
    cy.visitDemo();

    cy.dataCy('app-header')
      .contains('h1', 'VPhoneInput');
    cy.dataCy('app-header')
      .contains('p', 'International phone field for Vuetify 3 and Vue 3.');
  });

  it('should display package links', () => {
    cy.visitDemo();

    cy.dataCy('app-header')
      .contains('NPM')
      .should('contain.text', '(open in new tab)')
      .should('have.attr', 'href')
      .should('not.be.empty')
      .and('contain', 'https://www.npmjs.com/package/v-phone-input');
    cy.dataCy('app-header')
      .contains('GitHub')
      .should('contain.text', '(open in new tab)')
      .should('have.attr', 'href')
      .should('not.be.empty')
      .and('contain', 'https://github.com/paul-thebaud/v-phone-input');
    cy.dataCy('app-header')
      .contains('Docs')
      .should('contain.text', '(open in new tab)')
      .should('have.attr', 'href')
      .should('not.be.empty')
      .and('contain', 'https://github.com/paul-thebaud/v-phone-input#documentation');
  });
});
