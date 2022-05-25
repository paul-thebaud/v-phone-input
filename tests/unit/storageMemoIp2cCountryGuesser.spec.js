import { StorageMemoIp2cCountryGuesser } from '@/entry.esm';
import fakeIp2cFetch from './utils/fakeIp2cFetch';
import makeFakeStorage from './utils/makeFakeStorage';

describe('storageMemoIp2cCountryGuesser.js', () => {
  let storage;

  beforeEach(() => {
    storage = makeFakeStorage();
  });

  afterEach(() => {
    storage = undefined;
  });

  it('should use default storage and key', async () => {
    global.localStorage = storage;

    const storageMemoIp2cCountryGuesser = new StorageMemoIp2cCountryGuesser();

    expect(storageMemoIp2cCountryGuesser.storage).toBe(global.localStorage);
    expect(storageMemoIp2cCountryGuesser.key).toBe('v_phone_input_country');
  });

  it('should memoize promise from ip2c country guesser when not undefined', async () => {
    fakeIp2cFetch(Promise.resolve('0'));

    const storageMemoIp2cCountryGuesser = new StorageMemoIp2cCountryGuesser({
      storage, key: 'dummyKey',
    });

    expect(await storageMemoIp2cCountryGuesser.guess()).toBeUndefined();
    expect(storage.getItem.mock.calls[0][0]).toBe('dummyKey');
    expect(storage.getItem.mock.calls.length).toBe(1);
    expect(storage.setItem.mock.calls.length).toBe(0);
    expect(global.fetch.mock.calls.length).toBe(1);

    expect(await storageMemoIp2cCountryGuesser.guess()).toBeUndefined();
    expect(storage.getItem.mock.calls[0][0]).toBe('dummyKey');
    expect(storage.getItem.mock.calls.length).toBe(2);
    expect(storage.setItem.mock.calls.length).toBe(0);
    expect(global.fetch.mock.calls.length).toBe(2);

    fakeIp2cFetch();

    expect(await storageMemoIp2cCountryGuesser.guess()).toBe('FR');
    expect(storage.getItem.mock.calls[0][0]).toBe('dummyKey');
    expect(storage.getItem.mock.calls.length).toBe(3);
    expect(storage.setItem.mock.calls.length).toBe(1);
    expect(storage.setItem.mock.calls[0][0]).toBe('dummyKey');
    expect(storage.setItem.mock.calls[0][1]).toBe('FR');
    expect(global.fetch.mock.calls.length).toBe(1);

    expect(await storageMemoIp2cCountryGuesser.guess()).toBe('FR');
    expect(storage.getItem.mock.calls[0][0]).toBe('dummyKey');
    expect(storage.getItem.mock.calls.length).toBe(4);
    expect(storage.setItem.mock.calls.length).toBe(1);
    expect(global.fetch.mock.calls.length).toBe(1);
  });

  it('should use preference when defined', async () => {
    fakeIp2cFetch();

    const storageMemoIp2cCountryGuesser = new StorageMemoIp2cCountryGuesser({
      storage,
    });

    expect(await storageMemoIp2cCountryGuesser.guess()).toBe('FR');
    expect(storage.getItem.mock.calls.length).toBe(1);
    expect(storage.setItem.mock.calls.length).toBe(1);
    expect(global.fetch.mock.calls.length).toBe(1);

    expect(await storageMemoIp2cCountryGuesser.guess()).toBe('FR');
    expect(storage.getItem.mock.calls.length).toBe(2);
    expect(storage.setItem.mock.calls.length).toBe(1);
    expect(global.fetch.mock.calls.length).toBe(1);

    storageMemoIp2cCountryGuesser.setPreference('AF');

    expect(await storageMemoIp2cCountryGuesser.guess()).toBe('AF');
    expect(storage.getItem.mock.calls.length).toBe(3);
    expect(storage.setItem.mock.calls.length).toBe(2);
    expect(global.fetch.mock.calls.length).toBe(1);
  });
});
