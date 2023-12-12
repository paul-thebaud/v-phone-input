describe('InputCard.vue', () => {
  function cyVPhoneWrapper() {
    return cy.dataCy('input-wrapper');
  }

  function cyVPhone() {
    return cyVPhoneWrapper().get('.v-phone-input');
  }

  function cyVPhoneCountry() {
    return cyVPhone().get('.v-phone-input__country__input');
  }

  function cyVPhoneCountryMenu() {
    return cy.get('.v-phone-input__country__menu .v-list', { timeout: 10000 })
      .should('be.visible');
  }

  function cySelectMenu(menuName, optionName) {
    cy.contains(menuName)
      .parents('.v-select')
      .find('[role=button]')
      .click();
    cy.get('.v-menu .v-list', { timeout: 10000 })
      .should('be.visible')
      .contains(optionName)
      .click();
  }

  function cyVPhoneInput() {
    return cyVPhone().get('.v-phone-input__phone__input');
  }

  it('should display title and description', () => {
    cy.visitDemo();

    cy.dataCy('input-card')
      .contains('h2', 'Input preview');
    cy.dataCy('input-card')
      .contains('You can try the input and copy plugin options here.');
  });

  it('should display and copy plugin creation and show alert', () => {
    cy.visitDemo();

    cy.dataCy('input-card')
      .contains('Plugin initialization code copied to clipboard.')
      .should('not.exist');

    cy.dataCy('input-card')
      .find('button[title="Copy Plugin initialization code to clipboard"]')
      .click();

    cy.dataCy('input-card')
      .contains('Plugin initialization code copied to clipboard.');

    cy.dataCy('input-card-props')
      .contains('Plugin initialization code copied to clipboard.');

    const codeElement = () => cy.dataCy('input-card-props').get('.card--code');
    codeElement()
      .contains('import \'flag-icons/css/flag-icons.min.css\';')
      .contains('import \'v-phone-input/dist/v-phone-input.css\';')
      .contains('import { createVPhoneInput } from \'v-phone-input\';')
      .contains('const vPhoneInput = createVPhoneInput(')
      .contains('countryIconMode: \'svg\'')
      .contains('app.use(vPhoneInput);');

    codeElement()
      .contains('import \'world-flags-sprite/stylesheets/flags32.css\';')
      .should('not.exist');
    codeElement()
      .contains('import { VAutocomplete } from \'vuetify/components\';')
      .should('not.exist');
    codeElement()
      .contains('app.component(\'VAutocomplete\', VAutocomplete);')
      .should('not.exist');
    codeElement()
      .contains('countryIconMode: \'sprite\'')
      .should('not.exist');
    codeElement()
      .contains('enableSearchingCountry: true')
      .should('not.exist');

    cySelectMenu('Country Icon Mode', 'CSS sprite');

    codeElement()
      .contains('import \'world-flags-sprite/stylesheets/flags32.css\';')
      .contains('countryIconMode: \'sprite\'');
    codeElement()
      .contains('import \'flag-icons/css/flag-icons.min.css\';')
      .should('not.exist');
    codeElement()
      .contains('countryIconMode: \'svg\'')
      .should('not.exist');

    cySelectMenu('Country Icon Mode', 'Text');

    codeElement()
      .contains('countryIconMode')
      .should('not.exist');
    codeElement()
      .contains('import \'flag-icons/css/flag-icons.min.css\';')
      .should('not.exist');
    codeElement()
      .contains('import \'world-flags-sprite/stylesheets/flags32.css\';')
      .should('not.exist');

    cy.contains('Enable Searching Country')
      .parent()
      .click();

    codeElement()
      .contains('import { VAutocomplete } from \'vuetify/components\';')
      .contains('app.component(\'VAutocomplete\', VAutocomplete);')
      .contains('enableSearchingCountry: true');
  });

  it('should init with first country', () => {
    cy.visitDemo();

    cyVPhoneCountry()
      .containsCountryTitle('Afghanistan');
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
      .contains('Afghanistan');
  });

  it('should init with IP country', () => {
    cy.visitDemo('FR');

    cyVPhoneCountry()
      .containsCountryTitle('France');
  });

  it('should use emit value on input or country and re-format input', () => {
    cy.visitDemo();

    cy.contains('Enable Searching Country')
      .parent()
      .click();

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
      .find('input[type=text]')
      .clear()
      .type('France');
    cyVPhoneCountryMenu()
      .contains('France')
      .parents('.v-list-item')
      .click();

    cyVPhoneCountry()
      .containsCountryTitle('France');
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
      .find('input[type=text]')
      .clear()
      .type('Albania');
    cyVPhoneCountryMenu()
      .contains('Albania')
      .parents('.v-list-item')
      .click();

    cyVPhoneCountry()
      .containsCountryTitle('Albania');
    cyVPhoneInput()
      .find('input')
      .invoke('val')
      .then((val) => assert.equal(val, '02 34 56 78 90'));

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

  it('should be clearable without error', () => {
    cy.visitDemo();

    cy.contains('Clearable')
      .parent()
      .click();

    cyVPhoneInput()
      .find('input')
      .type('0234567890');

    cy.dataCy('input-card-props')
      .contains('Value')
      .parent()
      .contains('+93234567890');

    cyVPhoneInput()
      .find('input')
      .focus();

    cyVPhoneInput()
      .find('.v-field__clearable')
      .click();

    cy.dataCy('input-card-props')
      .contains('Value')
      .parent()
      .contains('-');
  });

  it('should detect country from international input', () => {
    cy.visitDemo();

    cyVPhoneInput()
      .find('input')
      .type('+33 1 23 45');

    cyVPhoneCountry()
      .containsCountryTitle('France');
  });

  it('should not detect country from invalid international input', () => {
    cy.visitDemo();

    cyVPhoneInput()
      .find('input')
      .type('+97812345');

    cyVPhoneCountry()
      .containsCountryTitle('Afghanistan');
  });

  it('should enable searching countries and force value defined', () => {
    cy.visitDemo();

    cy.contains('Enable Searching Country')
      .parent()
      .click();

    cyVPhoneCountry()
      .containsCountryTitle('Afghanistan');

    cyVPhoneCountry()
      .find('input[type=text]')
      .clear()
      .type('France');
    cyVPhoneCountryMenu()
      .contains('France')
      .parents('.v-list-item')
      .click();

    cyVPhoneCountry()
      .containsCountryTitle('France');

    cyVPhoneCountry()
      .find('input[type=text]')
      .clear()
      .type('{backspace}{enter}');

    cyVPhoneCountry()
      .containsCountryTitle('France');
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
      .should('have.attr', 'placeholder')
      .should('not.be.empty')
      .and('contain', 'Custom placeholder');

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
      .contains('Custom hint');
    cyVPhoneInput()
      .contains('Custom invalid message')
      .should('not.exist');
    cyVPhoneInput()
      .find('input')
      .should('have.attr', 'placeholder')
      .should('not.be.empty')
      .and('contain', 'Custom placeholder');

    cyVPhoneInput()
      .find('input')
      .type('023');

    cyVPhoneInput()
      .contains('Custom hint')
      .should('not.exist');
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

  it('should use svg country icon', () => {
    cy.visitDemo();

    cy.get('body').focus();
    cy.wait(200);

    cyVPhoneCountry()
      .containsCountryTitle('Afghanistan')
      .should('have.class', 'fi fi-af');
    cyVPhoneCountry()
      .find('[role=button]')
      .click();

    cyVPhoneCountryMenu()
      .contains('American Samoa')
      .parents('.v-list-item')
      .find('.v-list-item__prepend')
      .find('.v-phone-input__country__icon.fi.fi-as')
      .should((el) => {
        expect(el).to.not.have.attr('role');
        expect(el).to.not.have.attr('title');
      });
  });

  it('should use sprite country icon', () => {
    cy.visitDemo();

    cySelectMenu('Country Icon Mode', 'CSS sprite (using world-flags-sprite)');

    cy.get('body').focus();
    cy.wait(200);

    cyVPhoneCountry()
      .containsCountryTitle('Afghanistan')
      .should('have.class', 'f32')
      .find('.flag.af')
      .should('exist');
    cyVPhoneCountry()
      .find('[role=button]')
      .click();

    cyVPhoneCountryMenu()
      .contains('American Samoa')
      .parents('.v-list-item')
      .find('.v-list-item__prepend')
      .find('.v-phone-input__country__icon.f32')
      .should((el) => {
        expect(el).to.not.have.attr('role');
        expect(el).to.not.have.attr('title');
      })
      .find('.flag.as')
      .should('be.visible');
  });

  it('should use text country icon', () => {
    cy.visitDemo();

    cySelectMenu('Country Icon Mode', 'Text (default)');

    cy.get('body').focus();
    cy.wait(200);

    cyVPhoneCountry().contains('+93');
    cyVPhoneCountry()
      .find('[role=button]')
      .click();

    cyVPhoneCountryMenu()
      .contains('American Samoa')
      .parents('.v-list-item')
      .children('.v-phone-input__country__icon')
      .should('not.exist');
  });

  it('should use format style', () => {
    cy.visitDemo();

    cyVPhoneInput()
      .find('input')
      .type('0234567890');

    [
      ['National', '023 456 7890'],
      ['E164', '+93234567890'],
      ['International', '+93 23 456 7890'],
      ['Significant', '234567890'],
    ].forEach(([format, expectedVal]) => {
      cySelectMenu('Display Format', format);
      cyVPhoneInput()
        .find('input')
        .invoke('val')
        .then((val) => assert.equal(val, expectedVal));
    });
  });
});
