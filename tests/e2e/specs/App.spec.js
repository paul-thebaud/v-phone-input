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
    cy.get('#app').toMatchImageSnapshot({
      imageConfig: {
        threshold: 0.01,
        thresholdType: 'percent',
      },
    });
  });

  it('should toggle theme to dark and match snapshot', () => {
    cy.visitDemo();
    cy.contains('Dark theme').parent().click();
    cy.get('body').focus();
    cy.wait(200);
    cy.get('#app').toMatchImageSnapshot({
      imageConfig: {
        threshold: 0.011,
        thresholdType: 'percent',
      },
    });
  });
});
