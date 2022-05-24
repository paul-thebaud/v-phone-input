import { CountryIso2 } from '@/types/countries';
import Ip2cCountryGuesser from '@/utils/countries/ip2cCountryGuesser';

export default class MemoIp2cCountryGuesser extends Ip2cCountryGuesser {
  private memoCountry = undefined as CountryIso2 | undefined;

  public async guess(): Promise<CountryIso2 | undefined> {
    if (!this.memoCountry) {
      this.memoCountry = await super.guess();
    }

    return this.memoCountry;
  }
}
