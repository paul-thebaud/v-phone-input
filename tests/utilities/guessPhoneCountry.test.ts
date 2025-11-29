import { afterEach, expect } from "vitest";
import { guessPhoneCountry } from "../../src";

describe("guess phone country", () => {
  const mockFetch = (response: () => Promise<unknown>) => {
    const fetchMock = vi.fn(response);
    vi.stubGlobal("fetch", fetchMock);
  };

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("handles failed fetch", async () => {
    mockFetch(() => Promise.reject(new Error()));

    expect(await guessPhoneCountry()).toBeUndefined();
  });

  it("handles failed response read", async () => {
    mockFetch(() =>
      Promise.resolve({ text: () => Promise.reject(new Error()) }),
    );

    expect(await guessPhoneCountry()).toBeUndefined();
  });

  it("handles empty response", async () => {
    mockFetch(() => Promise.resolve({ text: () => Promise.resolve("") }));

    expect(await guessPhoneCountry()).toBeUndefined();
  });

  it("handles failed response", async () => {
    mockFetch(() => Promise.resolve({ text: () => Promise.resolve("0") }));

    expect(await guessPhoneCountry()).toBeUndefined();
  });

  it("handles successful response", async () => {
    mockFetch(() =>
      Promise.resolve({ text: () => Promise.resolve("1;FR;FRA;France") }),
    );

    expect(await guessPhoneCountry()).toStrictEqual("FR");
  });
});
