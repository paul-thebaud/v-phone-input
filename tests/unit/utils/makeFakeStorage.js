export default function makeFakeStorage() {
  const storage = {};
  const storageMock = {};

  storageMock.getItem = jest.fn((k) => storage[k]);
  storageMock.setItem = jest.fn((k, v) => {
    storage[k] = v;
  });

  return storageMock;
}
