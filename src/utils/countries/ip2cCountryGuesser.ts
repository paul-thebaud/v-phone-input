import { CountryGuesser, CountryIso2 } from '@/types/countries';

export default class Ip2cCountryGuesser implements CountryGuesser {
  public static readonly IP2C_URL = 'https://ip2c.org/s';

  // eslint-disable-next-line class-methods-use-this
  public async guess(): Promise<CountryIso2 | undefined> {
    let response;
    try {
      response = await fetch(Ip2cCountryGuesser.IP2C_URL);
    } catch (_) {
      return undefined;
    }

    const countryData = (await response.text() || '').toString().split(';');
    if (!countryData || countryData[0] !== '1') {
      return undefined;
    }

    return countryData[1];
  }
}
