declare namespace Cypress {
  interface Chainable {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    visitDemo(ipCountry?: string, config?: Record<string, unknown>): Chainable<Window>;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dataCy(value: string): Chainable<Element>;
  }
}
