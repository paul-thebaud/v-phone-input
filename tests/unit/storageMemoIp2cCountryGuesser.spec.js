import { StorageMemoIp2cCountryGuesser } from '@/entry.esm';

describe('storageMemoIp2cCountryGuesser.js', () => {
  it('should use default storage and key', async () => {
    global.localStorage = { getItem: jest.fn(), setItem: jest.fn() };

    const storageMemoIp2cCountryGuesser = new StorageMemoIp2cCountryGuesser();

    expect(storageMemoIp2cCountryGuesser.storage).toBe(global.localStorage);
    expect(storageMemoIp2cCountryGuesser.key).toBe('v_phone_input_country');
  });

  it('should memoize promise from ip2c country guesser when not undefined', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      text: () => Promise.resolve('0'),
    }));

    const storage = {};
    const storageMock = {
      getItem: jest.fn((k) => storage[k]),
      setItem: jest.fn((k, v) => {
        storage[k] = v;
      }),
    };

    const storageMemoIp2cCountryGuesser = new StorageMemoIp2cCountryGuesser({
      storage: storageMock, key: 'dummyKey',
    });

    expect(await storageMemoIp2cCountryGuesser.guess()).toBeUndefined();
    expect(storageMock.getItem.mock.calls[0][0]).toBe('dummyKey');
    expect(storageMock.getItem.mock.calls.length).toBe(1);
    expect(storageMock.setItem.mock.calls.length).toBe(0);
    expect(global.fetch.mock.calls.length).toBe(1);

    expect(await storageMemoIp2cCountryGuesser.guess()).toBeUndefined();
    expect(storageMock.getItem.mock.calls[0][0]).toBe('dummyKey');
    expect(storageMock.getItem.mock.calls.length).toBe(2);
    expect(storageMock.setItem.mock.calls.length).toBe(0);
    expect(global.fetch.mock.calls.length).toBe(2);

    global.fetch = jest.fn(() => Promise.resolve({
      text: () => Promise.resolve('1;FR'),
    }));

    expect(await storageMemoIp2cCountryGuesser.guess()).toBe('FR');
    expect(storageMock.getItem.mock.calls[0][0]).toBe('dummyKey');
    expect(storageMock.getItem.mock.calls.length).toBe(3);
    expect(storageMock.setItem.mock.calls.length).toBe(1);
    expect(storageMock.setItem.mock.calls[0][0]).toBe('dummyKey');
    expect(storageMock.setItem.mock.calls[0][1]).toBe('FR');
    expect(global.fetch.mock.calls.length).toBe(1);

    expect(await storageMemoIp2cCountryGuesser.guess()).toBe('FR');
    expect(storageMock.getItem.mock.calls[0][0]).toBe('dummyKey');
    expect(storageMock.getItem.mock.calls.length).toBe(4);
    expect(storageMock.setItem.mock.calls.length).toBe(1);
    expect(global.fetch.mock.calls.length).toBe(1);
  });
});
