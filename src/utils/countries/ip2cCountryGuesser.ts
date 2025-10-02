import { CountryGuesser } from '@/types/countries';

/**
 * @deprecated
 * This public API will be removed in a next major release.
 * Use your own country detection mechanism.
 */
export default class Ip2cCountryGuesser implements CountryGuesser {
  public static readonly IP2C_URL = 'https://ip2c.org/s';

  // eslint-disable-next-line class-methods-use-this
  public async guess(): Promise<string | undefined> {
    let response;
    let responseText;
    try {
      response = await fetch(Ip2cCountryGuesser.IP2C_URL);
      responseText = await response.text();
    } catch (_) {
      return undefined;
    }

    const countryData = responseText.toString().split(';');
    if (!countryData || countryData[0] !== '1') {
      return undefined;
    }

    return countryData[1];
  }
}
