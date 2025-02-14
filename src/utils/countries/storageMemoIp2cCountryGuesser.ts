import { PreferableCountryGuesser } from '@/types/countries';
import Ip2cCountryGuesser from '@/utils/countries/ip2cCountryGuesser';

interface StorageMemoIp2cCountryGuesserOptions {
  storage?: Storage;
  key?: string;
}

export default class StorageMemoIp2cCountryGuesser
  extends Ip2cCountryGuesser
  implements PreferableCountryGuesser {
  private readonly storage: Storage;

  private readonly key: string;

  public constructor(options: StorageMemoIp2cCountryGuesserOptions = {}) {
    super();

    this.storage = options.storage || localStorage;
    this.key = options.key || 'v_phone_input_country';
  }

  public async guess(): Promise<string | undefined> {
    const storageCountry = this.retrieveStoredCountry();
    if (storageCountry) {
      return storageCountry;
    }

    const country = await super.guess();
    if (country) {
      this.saveStoredCountry(country);
    }

    return country;
  }

  public setPreference(country: string): void {
    this.saveStoredCountry(country);
  }

  private retrieveStoredCountry(): string | undefined {
    return this.storage.getItem(this.key) || undefined;
  }

  private saveStoredCountry(country: string): void {
    this.storage.setItem(this.key, country);
  }

  public getStorage() {
    return this.storage;
  }

  public getKey() {
    return this.key;
  }
}
