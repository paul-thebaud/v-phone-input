import { MemoIp2cCountryGuesser } from '@/index';
import { describe, expect, it } from 'vitest';
import fakeIp2cFetch from './utils/fakeIp2cFetch';

describe('memoIp2cCountryGuesser.js', () => {
  it('should memoize promise from ip2c country guesser when not undefined', async () => {
    let fetchMock = fakeIp2cFetch(Promise.resolve('0'));

    const memoIp2cCountryGuesser = new MemoIp2cCountryGuesser();

    expect(await memoIp2cCountryGuesser.guess()).toBeUndefined();
    expect(fetchMock.calls.length).toBe(1);

    expect(await memoIp2cCountryGuesser.guess()).toBeUndefined();
    expect(fetchMock.calls.length).toBe(2);

    fetchMock = fakeIp2cFetch();

    expect(await memoIp2cCountryGuesser.guess()).toBe('FR');
    expect(fetchMock.calls.length).toBe(1);

    expect(await memoIp2cCountryGuesser.guess()).toBe('FR');
    expect(fetchMock.calls.length).toBe(1);
  });

  it('should use default storage and key', async () => {
    const fetchMock = fakeIp2cFetch();

    const memoIp2cCountryGuesser = new MemoIp2cCountryGuesser();

    expect(await memoIp2cCountryGuesser.guess()).toBe('FR');
    expect(fetchMock.calls.length).toBe(1);
    expect(await memoIp2cCountryGuesser.guess()).toBe('FR');
    expect(fetchMock.calls.length).toBe(1);

    memoIp2cCountryGuesser.setPreference('AF');

    expect(await memoIp2cCountryGuesser.guess()).toBe('AF');
    expect(fetchMock.calls.length).toBe(1);
    expect(await memoIp2cCountryGuesser.guess()).toBe('AF');
    expect(fetchMock.calls.length).toBe(1);
  });
});
