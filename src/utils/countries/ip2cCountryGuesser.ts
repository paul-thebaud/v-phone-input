import { CountryGuesser, CountryIso2 } from '@/types/countries';

export default class Ip2cCountryGuesser implements CountryGuesser {
  public static readonly IP2C_URL = 'https://ip2c.org/s';

  // eslint-disable-next-line class-methods-use-this
  public async guess(): Promise<CountryIso2> {
    let response;
    try {
      response = await fetch(Ip2cCountryGuesser.IP2C_URL);
    } catch (error) {
      throw new Error('unable to fetch the country');
    }

    const countryData = (await response.text() || '').toString().split(';');
    if (!countryData || countryData[0] !== '1') {
      throw new Error('invalid response for country');
    }

    return countryData[1];
  }
}
