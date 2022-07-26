import {
  Ip2cCountryGuesser,
  MemoIp2cCountryGuesser,
  StorageMemoIp2cCountryGuesser,
} from '@/index';
import isPreferableCountryGuesser from '@/utils/countries/isPreferableCountryGuesser';
import { describe, expect, it } from 'vitest';

describe('isPreferableCountryGuesser.js', () => {
  it('should differentiate preferable from classic country guessers', () => {
    expect(isPreferableCountryGuesser(new Ip2cCountryGuesser())).toBeFalsy();
    expect(isPreferableCountryGuesser(new MemoIp2cCountryGuesser())).toBeTruthy();
    expect(isPreferableCountryGuesser(new StorageMemoIp2cCountryGuesser())).toBeTruthy();
  });
});
