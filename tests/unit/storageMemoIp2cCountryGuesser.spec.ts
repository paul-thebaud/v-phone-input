import { StorageMemoIp2cCountryGuesser } from '@/index';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import fakeIp2cFetch from './utils/fakeIp2cFetch';
import makeFakeStorage from './utils/makeFakeStorage';

describe('storageMemoIp2cCountryGuesser.ts', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let storage: any;

  beforeEach(() => {
    storage = makeFakeStorage();
  });

  afterEach(() => {
    storage = undefined;
  });

  it('should use default storage and key', async () => {
    global.localStorage = storage;

    const storageMemoIp2cCountryGuesser = new StorageMemoIp2cCountryGuesser();

    expect(storageMemoIp2cCountryGuesser.getStorage()).toBe(global.localStorage);
    expect(storageMemoIp2cCountryGuesser.getKey()).toBe('v_phone_input_country');
  });

  it('should memoize promise from ip2c country guesser when not undefined', async () => {
    let fetchMock = fakeIp2cFetch(Promise.resolve('0'));

    const storageMemoIp2cCountryGuesser = new StorageMemoIp2cCountryGuesser({
      storage, key: 'dummyKey',
    });

    expect(await storageMemoIp2cCountryGuesser.guess()).toBeUndefined();
    expect(storage.getItem.mock.calls[0][0]).toBe('dummyKey');
    expect(storage.getItem.mock.calls.length).toBe(1);
    expect(storage.setItem.mock.calls.length).toBe(0);
    expect(fetchMock.calls.length).toBe(1);

    expect(await storageMemoIp2cCountryGuesser.guess()).toBeUndefined();
    expect(storage.getItem.mock.calls[0][0]).toBe('dummyKey');
    expect(storage.getItem.mock.calls.length).toBe(2);
    expect(storage.setItem.mock.calls.length).toBe(0);
    expect(fetchMock.calls.length).toBe(2);

    fetchMock = fakeIp2cFetch();

    expect(await storageMemoIp2cCountryGuesser.guess()).toBe('FR');
    expect(storage.getItem.mock.calls[0][0]).toBe('dummyKey');
    expect(storage.getItem.mock.calls.length).toBe(3);
    expect(storage.setItem.mock.calls.length).toBe(1);
    expect(storage.setItem.mock.calls[0][0]).toBe('dummyKey');
    expect(storage.setItem.mock.calls[0][1]).toBe('FR');
    expect(fetchMock.calls.length).toBe(1);

    expect(await storageMemoIp2cCountryGuesser.guess()).toBe('FR');
    expect(storage.getItem.mock.calls[0][0]).toBe('dummyKey');
    expect(storage.getItem.mock.calls.length).toBe(4);
    expect(storage.setItem.mock.calls.length).toBe(1);
    expect(fetchMock.calls.length).toBe(1);
  });

  it('should use preference when defined', async () => {
    const fetchMock = fakeIp2cFetch();

    const storageMemoIp2cCountryGuesser = new StorageMemoIp2cCountryGuesser({
      storage,
    });

    expect(await storageMemoIp2cCountryGuesser.guess()).toBe('FR');
    expect(storage.getItem.mock.calls.length).toBe(1);
    expect(storage.setItem.mock.calls.length).toBe(1);
    expect(fetchMock.calls.length).toBe(1);

    expect(await storageMemoIp2cCountryGuesser.guess()).toBe('FR');
    expect(storage.getItem.mock.calls.length).toBe(2);
    expect(storage.setItem.mock.calls.length).toBe(1);
    expect(fetchMock.calls.length).toBe(1);

    storageMemoIp2cCountryGuesser.setPreference('AF');

    expect(await storageMemoIp2cCountryGuesser.guess()).toBe('AF');
    expect(storage.getItem.mock.calls.length).toBe(3);
    expect(storage.setItem.mock.calls.length).toBe(2);
    expect(fetchMock.calls.length).toBe(1);
  });
});
