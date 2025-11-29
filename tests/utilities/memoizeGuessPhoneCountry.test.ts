import { expect } from "vitest";
import { ref } from "vue";
import { memoizeGuessPhoneCountry } from "../../src";

describe("memoize guess phone country", () => {
  it("adds memoized property on guess phone function", async () => {
    const store: { country: string | null } = { country: null };
    const guessPhoneCountry = vi.fn(() => null);
    const memoizedGuessPhoneCountry = memoizeGuessPhoneCountry(
      guessPhoneCountry,
      () => store.country,
      (c) => {
        store.country = c;
      },
    );

    expect(memoizedGuessPhoneCountry).not.toStrictEqual(guessPhoneCountry);
    expect(memoizedGuessPhoneCountry.memoized).toBeNull();
    memoizedGuessPhoneCountry.memoized = "FR";
    expect(memoizedGuessPhoneCountry.memoized).toStrictEqual("FR");
    memoizedGuessPhoneCountry.memoized = null;
    expect(memoizedGuessPhoneCountry.memoized).toBeNull();
  });

  it("adds memoized ref on guess phone function", async () => {
    const country = ref<string | null>(null);
    const guessPhoneCountry = vi.fn(() => null);
    const memoizedGuessPhoneCountry = memoizeGuessPhoneCountry(
      guessPhoneCountry,
      country,
    );

    expect(memoizedGuessPhoneCountry).not.toStrictEqual(guessPhoneCountry);
    expect(memoizedGuessPhoneCountry.memoized).toBe(country);
  });
});
