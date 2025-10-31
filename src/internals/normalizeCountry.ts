import type { VPhoneInputCountryObjectOrIso2 } from "../types";

const normalizeCountryIso2 = (country: string | null | undefined) =>
  (country ?? "").toUpperCase();

export default function normalizeCountry(
  country: VPhoneInputCountryObjectOrIso2 | null | undefined,
) {
  return normalizeCountryIso2(
    typeof country === "string" ? country : country?.iso2,
  );
}
