describe('App.vue', () => {
  it('should display all titles', () => {
    cy.visitDemo();

    cy.contains('h1', 'VPhoneInput');
    cy.contains('h2', 'Installation');
    cy.contains('h2', 'Configuration');
    cy.contains('h2', 'Input preview');
  });

  it('should match snapshot', () => {
    cy.visitDemo();
    cy.get('body').focus();
    cy.wait(200);
    cy.get('#app').compareSnapshot('home-light', 0.015);
  });

  it('should toggle theme to dark and match snapshot', () => {
    cy.visitDemo();
    cy.contains('Theme')
      .parents('.v-select')
      .find('[role=textbox]')
      .click();
    cy.get('.v-menu')
      .contains('Dark')
      .click();
    cy.get('body').focus();
    cy.wait(200);
    cy.get('#app').compareSnapshot('home-dark', 0.015);
  });
});
