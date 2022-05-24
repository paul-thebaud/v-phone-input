import { CountryIso2 } from '@/types/countries';
import Ip2cCountryGuesser from '@/utils/countries/ip2cCountryGuesser';

interface StorageMemoIp2cCountryGuesserOptions {
  storage?: Storage;
  key?: string;
}

export default class StorageMemoIp2cCountryGuesser extends Ip2cCountryGuesser {
  private readonly storage: Storage;

  private readonly key: string;

  public constructor(options: StorageMemoIp2cCountryGuesserOptions = {}) {
    super();

    this.storage = options.storage || localStorage;
    this.key = options.key || 'v_phone_input_country';
  }

  public async guess(): Promise<CountryIso2 | undefined> {
    const storageCountry = this.storage.getItem(this.key);
    if (storageCountry) {
      return storageCountry;
    }

    const country = await super.guess();
    if (country) {
      this.storage.setItem(this.key, country);
    }

    return country;
  }
}
