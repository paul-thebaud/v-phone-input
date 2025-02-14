import { PreferableCountryGuesser } from '@/types/countries';
import Ip2cCountryGuesser from '@/utils/countries/ip2cCountryGuesser';

export default class MemoIp2cCountryGuesser
  extends Ip2cCountryGuesser
  implements PreferableCountryGuesser {
  private memoCountry = undefined as string | undefined;

  public async guess(): Promise<string | undefined> {
    if (!this.memoCountry) {
      this.memoCountry = await super.guess();
    }

    return this.memoCountry;
  }

  public setPreference(country: string): void {
    this.memoCountry = country;
  }
}
