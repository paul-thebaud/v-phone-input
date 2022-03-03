describe('InputCard.vue', () => {
  function cyVPhone() {
    return cy.dataCy('input-card').get('.v-phone-input');
  }

  function cyVPhoneCountry() {
    return cyVPhone().get('.v-phone-input__country');
  }

  function cyVPhoneCountryMenu() {
    return cy.get('.v-phone-input__country__menu');
  }

  function cyVPhoneInput() {
    return cyVPhone().get('.v-phone-input__phone');
  }

  it('should display title and description', () => {
    cy.visitDemo();

    cy.dataCy('input-card')
      .contains('h2', 'Input preview');
    cy.dataCy('input-card')
      .contains('You can try the input and copy plugin options here.');
  });

  it('should copy json options and show alert', () => {
    cy.visitDemo();

    cy.dataCy('input-card')
      .contains('Options JSON copied to clipboard.')
      .should('not.exist');

    cy.dataCy('input-card')
      .find('button[title="Copy Options JSON to clipboard"]')
      .click();

    cy.dataCy('input-card')
      .contains('Options JSON copied to clipboard.');
  });

  it('should init with first country and default props', () => {
    cy.visitDemo();

    cyVPhoneCountry()
      .contains('Afghanistan');
    cyVPhoneInput()
      .find('input')
      .invoke('val')
      .then((val) => assert.equal(val, ''));

    cy.dataCy('input-card-props')
      .contains('Value')
      .parent()
      .contains('-');
    cy.dataCy('input-card-props')
      .contains('Valid')
      .parent()
      .contains('false');
    cy.dataCy('input-card-props')
      .contains('Country')
      .parent()
      .contains('Unknown');
    cy.dataCy('input-card-props')
      .contains('Options JSON')
      .parent()
      .contains(JSON.stringify({ countryIconMode: 'svg' }, null, 2));
  });

  it('should init with IP country', () => {
    cy.visitDemo('FR');

    cyVPhoneCountry()
      .contains('France');
  });

  it('should update options json object', () => {
    cy.visitDemo();

    cy.contains('Enable Searching Country')
      .parent()
      .click();

    cy.dataCy('input-card-props')
      .contains('Options JSON')
      .parent()
      .contains(JSON.stringify({ countryIconMode: 'svg', enableSearchingCountry: true }, null, 2));
  });

  it('should use emit value on input or country and re-format input', () => {
    cy.visitDemo();

    cyVPhoneInput()
      .find('input')
      .type('023');

    cyVPhoneInput()
      .contains('The "Phone" field is not a valid phone number (example: 023 456 7890).');
    cy.dataCy('input-card-props')
      .contains('Value')
      .parent()
      .contains('+93023');
    cy.dataCy('input-card-props')
      .contains('Valid')
      .parent()
      .contains('false');
    cy.dataCy('input-card-props')
      .contains('Country')
      .parent()
      .contains('Afghanistan');

    cyVPhoneInput()
      .find('input')
      .type('4567890');
    cyVPhoneInput()
      .find('input')
      .invoke('val')
      .then((val) => assert.equal(val, '023 456 7890'));

    cyVPhoneInput()
      .contains('The "Phone" field is not a valid phone number')
      .should('not.exist');
    cy.dataCy('input-card-props')
      .contains('Value')
      .parent()
      .contains('+93234567890');
    cy.dataCy('input-card-props')
      .contains('Valid')
      .parent()
      .contains('true');
    cy.dataCy('input-card-props')
      .contains('Country')
      .parent()
      .contains('Afghanistan');

    cyVPhoneCountry()
      .find('[role=button]')
      .click();

    cy.get('body')
      .type('f');

    cyVPhoneCountryMenu()
      .scrollTo(0, 100)
      .contains('France')
      .click();

    cyVPhoneCountry()
      .contains('France');
    cyVPhoneInput()
      .find('input')
      .invoke('val')
      .then((val) => assert.equal(val, '02 34 56 78 90'));

    cyVPhoneInput()
      .contains('The "Phone" field is not a valid phone number')
      .should('not.exist');
    cy.dataCy('input-card-props')
      .contains('Value')
      .parent()
      .contains('+33234567890');
    cy.dataCy('input-card-props')
      .contains('Valid')
      .parent()
      .contains('true');
    cy.dataCy('input-card-props')
      .contains('Country')
      .parent()
      .contains('France');

    cyVPhoneInput()
      .find('input')
      .type('{backspace}');

    cyVPhoneInput()
      .contains('The "Phone" field is not a valid phone number (example: 01 23 45 67 89).');
    cy.dataCy('input-card-props')
      .contains('Value')
      .parent()
      .contains('+33023456789');
    cy.dataCy('input-card-props')
      .contains('Valid')
      .parent()
      .contains('false');
    cy.dataCy('input-card-props')
      .contains('Country')
      .parent()
      .contains('France');

    cyVPhoneInput()
      .find('input')
      .type('0');

    cyVPhoneInput()
      .contains('The "Phone" field is not a valid phone number')
      .should('not.exist');
    cy.dataCy('input-card-props')
      .contains('Value')
      .parent()
      .contains('+33234567890');
    cy.dataCy('input-card-props')
      .contains('Valid')
      .parent()
      .contains('true');
    cy.dataCy('input-card-props')
      .contains('Country')
      .parent()
      .contains('France');

    cyVPhoneCountry()
      .find('[role=button]')
      .click();

    cy.get('body')
      .type('a');

    cyVPhoneCountryMenu()
      .scrollTo(0, 100)
      .contains('Albania')
      .click();

    cyVPhoneCountry()
      .contains('Albania');
    cyVPhoneInput()
      .find('input')
      .invoke('val')
      .then((val) => assert.equal(val, '023 456 7890'));

    cyVPhoneInput()
      .contains('The "Phone" field is not a valid phone number (example: 022 345 678).');
    cy.dataCy('input-card-props')
      .contains('Value')
      .parent()
      .contains('+355234567890');
    cy.dataCy('input-card-props')
      .contains('Valid')
      .parent()
      .contains('false');
    cy.dataCy('input-card-props')
      .contains('Country')
      .parent()
      .contains('Albania');
  });

  it('should use default labels', () => {
    cy.visitDemo();

    cyVPhoneCountry().contains('Country');
    cyVPhoneCountry()
      .find('input')
      .should('have.attr', 'aria-label')
      .should('not.be.empty')
      .and('contain', 'Country for Phone');

    cyVPhoneInput()
      .contains('Phone');
    cyVPhoneInput()
      .find('input')
      .should('not.have.attr', 'aria-label');

    cyVPhoneInput()
      .contains('The "Phone" field is not a valid phone number')
      .should('not.exist');

    cyVPhoneInput()
      .find('input')
      .focus();

    cyVPhoneInput()
      .find('input')
      .should('not.have.attr', 'placeholder');

    cyVPhoneInput()
      .find('input')
      .type('023');

    cyVPhoneInput()
      .contains('The "Phone" field is not a valid phone number (example: 023 456 7890).');

    cyVPhoneInput()
      .find('input')
      .type('4567890');

    cyVPhoneInput()
      .contains('The "Phone" field is not a valid phone number')
      .should('not.exist');
  });

  it('should use customized labels', () => {
    cy.visitDemo();

    cy.dataCy('prop-input-label').type('Custom label');
    cy.dataCy('prop-input-ariaLabel').type('Custom aria label');
    cy.dataCy('prop-input-countryLabel').type('Custom country label');
    cy.dataCy('prop-input-countryAriaLabel').type('Custom country aria label');
    cy.dataCy('prop-input-placeholder').type('Custom placeholder');
    cy.dataCy('prop-input-hint').type('Custom hint');
    cy.dataCy('prop-input-invalidMessage').type('Custom invalid message');

    cyVPhoneCountry().contains('Custom country label');
    cyVPhoneCountry()
      .find('input')
      .should('have.attr', 'aria-label')
      .should('not.be.empty')
      .and('contain', 'Custom country aria label');

    cyVPhoneInput().contains('Custom label');
    cyVPhoneInput()
      .find('input')
      .should('have.attr', 'aria-label')
      .should('not.be.empty')
      .and('contain', 'Custom aria label');
    cyVPhoneInput()
      .find('input')
      .should('not.have.attr', 'placeholder');

    cyVPhoneInput()
      .contains('Custom hint')
      .should('not.exist');
    cyVPhoneInput()
      .contains('Custom invalid message')
      .should('not.exist');

    cyVPhoneInput()
      .find('input')
      .focus();

    cyVPhoneInput()
      .find('input')
      .should('have.attr', 'placeholder')
      .should('not.be.empty')
      .and('contain', 'Custom placeholder');

    cyVPhoneInput()
      .find('input')
      .type('023');

    cyVPhoneInput()
      .contains('Custom invalid message');

    cyVPhoneInput()
      .find('input')
      .type('4567890');

    cyVPhoneInput()
      .find('input')
      .blur();

    cyVPhoneInput()
      .contains('Custom hint')
      .should('not.exist');
    cyVPhoneInput()
      .contains('Custom invalid message')
      .should('not.exist');

    cy.contains('Persistent Placeholder')
      .parent()
      .click();
    cy.contains('Persistent Hint')
      .parent()
      .click();

    cyVPhoneInput()
      .find('input')
      .should('have.attr', 'placeholder')
      .should('not.be.empty')
      .and('contain', 'Custom placeholder');
    cyVPhoneInput()
      .contains('Custom hint');
  });

  it('should use svg country icon and match snapshot', () => {
    cy.visitDemo();

    cy.contains('Country Icon Mode')
      .parents('.v-select')
      .find('[role=button]')
      .click();
    cy.get('.v-menu__content')
      .contains('SVG (using flag-icons)')
      .click();

    cy.get('body').focus();
    cy.wait(200);
    cyVPhoneCountry().toMatchImageSnapshot();

    cyVPhoneCountry()
      .contains('Afghanistan')
      .should('have.class', 'd-sr-only')
      .parent()
      .should('have.class', 'v-phone-input__country__country-icon fi fi-af');
    cyVPhoneCountry()
      .find('[role=button]')
      .click();

    cyVPhoneCountryMenu()
      .contains('American Samoa +1684')
      .parents('.v-list-item')
      .find('.v-list-item__icon')
      .contains('American Samoa')
      .should('not.exist');
    cyVPhoneCountryMenu()
      .contains('American Samoa +1684')
      .parents('.v-list-item')
      .find('.v-list-item__icon > span')
      .should('have.class', 'v-phone-input__country__country-icon fi fi-as');
  });

  it('should use sprite country icon and match snapshot', () => {
    cy.visitDemo();

    cy.contains('Country Icon Mode')
      .parents('.v-select')
      .find('[role=button]')
      .click();
    cy.get('.v-menu__content')
      .contains('CSS sprite (using world-flags-sprite)')
      .click();

    cy.get('body').focus();
    cy.wait(200);
    cyVPhoneCountry().toMatchImageSnapshot();

    cyVPhoneCountry()
      .contains('Afghanistan')
      .should('have.class', 'd-sr-only')
      .parent()
      .should('have.class', 'v-phone-input__country__country-icon flag af')
      .parent()
      .should('have.class', 'f32');
    cyVPhoneCountry()
      .find('[role=button]')
      .click();

    cyVPhoneCountryMenu()
      .contains('American Samoa +1684')
      .parents('.v-list-item')
      .find('.v-list-item__icon')
      .contains('American Samoa')
      .should('not.exist');
    cyVPhoneCountryMenu()
      .contains('American Samoa +1684')
      .parents('.v-list-item')
      .find('.v-list-item__icon > span')
      .should('have.class', 'f32')
      .find('span')
      .should('have.class', 'v-phone-input__country__country-icon flag as');
  });

  it('should use none country icon and match snapshot', () => {
    cy.visitDemo();

    cy.contains('Country Icon Mode')
      .parents('.v-select')
      .find('[role=button]')
      .click();
    cy.get('.v-menu__content')
      .contains('None (default)')
      .click();

    cy.get('body').focus();
    cy.wait(200);
    cyVPhoneCountry().toMatchImageSnapshot();

    cyVPhoneCountry()
      .contains('+93')
      .should('not.have.class', 'd-sr-only')
      .parent()
      .should('not.have.class', 'v-phone-input__country__country-icon');
    cyVPhoneCountry()
      .find('[role=button]')
      .click();

    cyVPhoneCountryMenu()
      .contains('American Samoa +1684')
      .parents('.v-list-item')
      .find('.v-list-item__icon')
      .should('not.exist');
  });
});
