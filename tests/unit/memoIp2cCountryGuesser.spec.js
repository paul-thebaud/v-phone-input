import { MemoIp2cCountryGuesser } from '@/entry.esm';

describe('memoIp2cCountryGuesser.js', () => {
  it('should memoize promise from ip2 country guesser', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      text: () => Promise.resolve('1;FR'),
    }));

    const memoIp2cCountryGuesser = new MemoIp2cCountryGuesser();

    expect(await memoIp2cCountryGuesser.guess()).toBe('FR');
    expect(global.fetch.mock.calls.length).toBe(1);

    expect(await memoIp2cCountryGuesser.guess()).toBe('FR');
    expect(global.fetch.mock.calls.length).toBe(1);
  });
});
