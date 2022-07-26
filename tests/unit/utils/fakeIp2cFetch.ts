import { vi } from 'vitest';

export default function fakeIp2cFetch(returnResult = Promise.resolve('1;FR')) {
  const fetchMock = vi.fn(() => Promise.resolve({
    text: () => returnResult,
  }));

  global.fetch = fetchMock as unknown as (typeof global.fetch);

  return fetchMock.mock;
}
