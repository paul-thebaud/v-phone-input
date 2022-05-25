import {
  Ip2cCountryGuesser,
  MemoIp2cCountryGuesser,
  StorageMemoIp2cCountryGuesser,
} from '@/entry.esm';
import isPreferableCountryGuesser from '@/utils/countries/isPreferableCountryGuesser';

describe('isPreferableCountryGuesser.js', () => {
  it('should differentiate preferable from classic country guessers', () => {
    expect(isPreferableCountryGuesser(new Ip2cCountryGuesser())).toBeFalsy();
    expect(isPreferableCountryGuesser(new MemoIp2cCountryGuesser())).toBeTruthy();
    expect(isPreferableCountryGuesser(new StorageMemoIp2cCountryGuesser())).toBeTruthy();
  });
});
