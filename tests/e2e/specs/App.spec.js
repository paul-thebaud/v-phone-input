describe('App.vue', () => {
  it('should display demo titles', () => {
    cy.visitDemo('FR');
    cy.contains('h1', 'VPhoneInput');
    cy.contains('h2', 'Installation');
    cy.contains('h2', 'Configuration');
    cy.contains('h2', 'Input preview');
  });

  it('should match snapshot', () => {
    cy.visitDemo('FR');
    cy.contains('h1', 'VPhoneInput');
    cy.contains('h2', 'Installation');
    cy.contains('h2', 'Configuration');
    cy.contains('h2', 'Input preview');

    cy.get('#app').toMatchImageSnapshot();
  });

  it('should toggle theme to dark and match snapshot', () => {
    cy.visitDemo('FR');
    cy.get('[data-cy=dark-switch]').parent().click();

    cy.get('#app').toMatchImageSnapshot();
  });
});
