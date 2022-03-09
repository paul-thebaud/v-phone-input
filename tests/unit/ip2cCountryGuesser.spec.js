import { Ip2cCountryGuesser } from '@/entry.esm';

describe('ip2cCountryGuesser.js', () => {
  it('should return undefined when fetch fails', async () => {
    global.fetch = jest.fn(() => Promise.reject());

    expect(await new Ip2cCountryGuesser().guess()).toBeUndefined();
  });

  it('should return undefined when fetch succeeded with invalid result', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      text: () => Promise.resolve('0'),
    }));

    expect(await new Ip2cCountryGuesser().guess()).toBeUndefined();
  });

  it('should return undefined when fetch succeeded with valid result', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      text: () => Promise.resolve('1;FR'),
    }));

    expect(await new Ip2cCountryGuesser().guess()).toEqual('FR');
  });
});
