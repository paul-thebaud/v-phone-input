import { CountryIso2 } from '@/utils/countries/types';
import Ip2cCountryGuesser from '@/utils/countries/ip2cCountryGuesser';

export default class MemoIp2cCountryGuesser extends Ip2cCountryGuesser {
  private memoGuessPromise = undefined as Promise<CountryIso2> | undefined;

  public async guess(): Promise<CountryIso2> {
    if (!this.memoGuessPromise) {
      this.memoGuessPromise = super.guess();
    }

    return await this.memoGuessPromise;
  }
}
