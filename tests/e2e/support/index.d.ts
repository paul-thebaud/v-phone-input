declare namespace Cypress {
  interface Chainable {
    visitDemo(ipCountry?: string, config?: Record<string, unknown>): Chainable<Window>;

    dataCy(value: string): Chainable<Element>;

    containsCountryTitle(value: string): Chainable<Element>;

    compareSnapshot(name: string, threshold?: number): Chainable<Element>;
  }
}
