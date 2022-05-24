import { MemoIp2cCountryGuesser } from '@/entry.esm';

describe('memoIp2cCountryGuesser.js', () => {
  it('should memoize promise from ip2c country guesser when not undefined', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      text: () => Promise.resolve('0'),
    }));

    const memoIp2cCountryGuesser = new MemoIp2cCountryGuesser();

    expect(await memoIp2cCountryGuesser.guess()).toBeUndefined();
    expect(global.fetch.mock.calls.length).toBe(1);

    expect(await memoIp2cCountryGuesser.guess()).toBeUndefined();
    expect(global.fetch.mock.calls.length).toBe(2);

    global.fetch = jest.fn(() => Promise.resolve({
      text: () => Promise.resolve('1;FR'),
    }));

    expect(await memoIp2cCountryGuesser.guess()).toBe('FR');
    expect(global.fetch.mock.calls.length).toBe(1);

    expect(await memoIp2cCountryGuesser.guess()).toBe('FR');
    expect(global.fetch.mock.calls.length).toBe(1);
  });
});
