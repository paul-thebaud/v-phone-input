describe('App.vue', () => {
  it('should display all titles', () => {
    cy.visitDemo();

    cy.contains('h1', 'VPhoneInput');
    cy.contains('h2', 'Installation');
    cy.contains('h2', 'Configuration');
    cy.contains('h2', 'Input preview');
  });
});
