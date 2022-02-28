import { CountryIso2 } from '@/types/countries';
import Ip2cCountryGuesser from '@/utils/countries/ip2cCountryGuesser';

export default class MemoIp2cCountryGuesser extends Ip2cCountryGuesser {
  private memoGuessPromise = undefined as Promise<CountryIso2 | undefined> | undefined;

  public async guess(): Promise<CountryIso2 | undefined> {
    if (!this.memoGuessPromise) {
      this.memoGuessPromise = super.guess();
    }

    return this.memoGuessPromise;
  }
}
