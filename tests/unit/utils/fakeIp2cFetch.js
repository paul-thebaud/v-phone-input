export default function fakeIp2cFetch(returnResult = Promise.resolve('1;FR')) {
  global.fetch = jest.fn(() => Promise.resolve({
    text: () => returnResult,
  }));
}
