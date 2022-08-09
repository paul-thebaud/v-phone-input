describe('PropsCard.vue', () => {
  it('should display title and description', () => {
    cy.visitDemo();

    cy.dataCy('props-card')
      .contains('h2', 'Configuration');
    cy.dataCy('props-card')
      .contains('You can customize the input options here.');
  });

  it('should search props', () => {
    cy.visitDemo();

    cy.dataCy('props-card')
      .contains('Hint');
    cy.dataCy('props-card')
      .contains('Persistent Hint');
    cy.dataCy('props-card')
      .contains('Placeholder');
    cy.dataCy('props-card')
      .contains('Persistent Placeholder');
    cy.dataCy('props-card')
      .find('[role=list]')
      .find('[role=listitem]')
      .should('have.length', 22);

    cy.dataCy('search-props').type('laceholde');

    cy.dataCy('props-card')
      .contains('Hint')
      .should('not.exist');
    cy.dataCy('props-card')
      .contains('Persistent Hint')
      .should('not.exist');
    cy.dataCy('props-card')
      .contains('Placeholder');
    cy.dataCy('props-card')
      .contains('Persistent Placeholder');
    cy.dataCy('props-card')
      .find('[role=list]')
      .find('[role=listitem]')
      .should('have.length', 2);
  });
});
