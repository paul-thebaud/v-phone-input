import { Ip2cCountryGuesser } from '@/index';
import { describe, expect, it } from 'vitest';
import fakeIp2cFetch from './utils/fakeIp2cFetch';

describe('ip2cCountryGuesser.ts', () => {
  it('should return undefined when fetch fails', async () => {
    fakeIp2cFetch(Promise.reject());

    expect(await new Ip2cCountryGuesser().guess()).toBeUndefined();
  });

  it('should return undefined when fetch succeeded with invalid result', async () => {
    fakeIp2cFetch(Promise.resolve('0'));

    expect(await new Ip2cCountryGuesser().guess()).toBeUndefined();
  });

  it('should return undefined when fetch succeeded with valid result', async () => {
    fakeIp2cFetch();

    expect(await new Ip2cCountryGuesser().guess()).toEqual('FR');
  });
});
