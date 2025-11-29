import "vuetify/styles";
import { ref } from "vue";
import { memoizeGuessPhoneCountry } from "../../src";
import customPhoneInputTestTools from "../fixtures/composablePhoneInputTestTools";
import vuetifyPhoneInputTestTools from "../fixtures/vuetifyPhoneInputTestTools";
import clickOutside from "../support/utilities/clickOutside";

describe("PhoneInput", () => {
  [customPhoneInputTestTools, vuetifyPhoneInputTestTools].forEach((tools) => {
    describe(tools.name, () => {
      it("inits with no phone", () => {
        tools.mount();

        tools.expectCountry("AF");
        tools.expectPhone("");
        tools.expectError(null);
      });

      it("inits with valid E164 phone", () => {
        tools.mount({
          modelValue: "+33612345678",
        });

        tools.expectCountry("FR");
        tools.expectPhone("06 12 34 56 78");
        tools.expectError(null);
      });

      it("inits with valid country and E164 phone", () => {
        tools.mount({
          country: "BE",
          modelValue: "+33612345678",
        });

        tools.expectCountry("FR");
        tools.expectPhone("06 12 34 56 78");
        tools.expectError(null);
      });

      it("inits with valid national phone", () => {
        tools.mount({
          modelValue: "0612345678",
        });

        tools.expectCountry("AF");
        tools.expectPhone("061 234 5678");
        tools.expectError(null);
      });

      it("inits with valid country and national phone", () => {
        tools.mount({
          country: "FR",
          modelValue: "0612345678",
        });

        tools.expectCountry("FR");
        tools.expectPhone("06 12 34 56 78");
        tools.expectError(null);
      });

      it("inits with invalid E164 phone", () => {
        tools.mount({
          modelValue: "+33712345678",
        });

        tools.expectCountry("FR");
        tools.expectPhone("+33712345678");
        tools.expectError(
          'The "Phone" field is not a valid phone number (example: 01 23 45 67 89).',
        );
      });

      it("inits with invalid national phone", () => {
        tools.mount({
          modelValue: "0123456789",
        });

        tools.expectCountry("AF");
        tools.expectPhone("0123456789");
        tools.expectError(
          'The "Phone" field is not a valid phone number (example: 023 456 7890).',
        );
      });

      it("inits with invalid country", () => {
        tools.mount({
          country: "ABC",
          modelValue: "0612345678",
        });

        tools.expectCountry("AF");
        tools.expectPhone("061 234 5678");
        tools.expectError(null);
      });

      it("inits with preferred country", () => {
        tools.mount({
          preferCountries: ["FR"],
        });

        tools.expectCountry("FR");
      });

      it("inits with country guesser: only one country possible", () => {
        tools.mount({
          includeCountries: ["FR"],
          guessCountry: () => {
            throw new Error("[test] Country guessing should not occur.");
          },
        });

        tools.expectCountry("FR");
      });

      it("inits with country guesser and memoized country: get/set", () => {
        tools.mount({
          guessCountry: memoizeGuessPhoneCountry(
            () => {
              throw new Error("[test] Country guessing should not occur.");
            },
            () => "FR",
            () => {
              throw new Error("[test] Country guessing set should not occur.");
            },
          ),
        });

        tools.expectCountry("FR");
      });

      it("inits with country guesser and memoized country: ref", () => {
        tools.mount({
          guessCountry: memoizeGuessPhoneCountry(() => {
            throw new Error("[test] Country guessing should not occur.");
          }, ref("FR")),
        });

        tools.expectCountry("FR");
      });

      it("inits with country guesser: valid country", () => {
        tools.mount({
          country: "FR",
          modelValue: "0612345678",
          guessCountry: () => {
            throw new Error("[test] Country guessing should not occur.");
          },
        });

        tools.expectCountry("FR");
        tools.expectPhone("06 12 34 56 78");
        tools.expectError(null);
      });

      it("inits with country guesser: valid phone", () => {
        tools.mount({
          modelValue: "+33612345678",
          guessCountry: () => {
            throw new Error("[test] Country guessing should not occur.");
          },
        });

        tools.expectCountry("FR");
        tools.expectPhone("06 12 34 56 78");
        tools.expectError(null);
      });

      it("inits with country guesser: failed country guessing", () => {
        tools.mount({
          guessCountry: async () => null,
        });

        tools.expectCountry("AF");
        tools.expectPhone("");
        tools.expectError(null);
      });

      it("inits with country guesser: successful country guessing", () => {
        tools.mount({
          guessCountry: async () => "FR",
        });

        tools.expectCountry("FR");
        tools.expectPhone("");
        tools.expectError(null);
      });

      it("does not format invalid phone", () => {
        tools.mount({
          displayFormatDelay: 0,
        });

        tools.typePhone("+33712345678");
        tools.expectCountry("FR");
        tools.expectPhone("+33712345678");
        tools.expectError(
          'The "Phone" field is not a valid phone number (example: 01 23 45 67 89).',
        );
      });

      it("does not reformat valid phone on country change if not valid anymore", () => {
        tools.mount({
          displayFormatDelay: 0,
        });

        tools.typePhone("+33612345678");
        tools.expectCountry("FR");
        tools.expectPhone("06 12 34 56 78");
        tools.expectError(null);

        tools.typePhone("{moveToStart}{rightArrow}{del}{del}7");
        tools.expectCountry("FR");
        tools.expectPhone("0712 34 56 78");
        tools.expectError(
          'The "Phone" field is not a valid phone number (example: 01 23 45 67 89).',
        );
      });

      it("reformats valid phone on country change if still valid", () => {
        tools.mount({
          displayFormatDelay: 0,
        });

        tools.typePhone("+33612345678");
        tools.expectCountry("FR");
        tools.expectPhone("06 12 34 56 78");
        tools.expectError(null);

        tools.selectCountry("AF");
        tools.expectCountry("AF");
        tools.expectPhone("061 234 5678");
        tools.expectError(null);
      });

      it("formats valid phone on blur ", () => {
        tools.mount();

        tools.typePhone("+33612345678");
        tools.expectCountry("FR");
        tools.expectPhone("+33612345678");
        tools.expectError(null);

        cy.wait(1500);

        tools.expectPhone("+33612345678");

        clickOutside();
        tools.expectPhone("06 12 34 56 78");
      });

      it("formats valid phone after input (immediate)", () => {
        tools.mount({
          displayFormatDelay: 0,
        });

        tools.typePhone("+33612345678");
        tools.expectCountry("FR");
        tools.expectPhone("06 12 34 56 78");
        tools.expectError(null);
      });

      it("formats valid phone after input (delayed)", () => {
        tools.mount({
          displayFormatOnBlur: false,
        });

        tools.typePhone("+33612345678");
        tools.expectCountry("FR");
        tools.expectPhone("+33612345678");
        tools.expectError(null);

        cy.wait(500);

        tools.expectPhone("+33612345678");

        cy.wait(1000);

        tools.expectPhone("06 12 34 56 78");
      });

      it("detects country from valid phone prefix", () => {
        tools.mount();

        tools.typePhone("+3");
        tools.expectPhone("+3");
        tools.expectCountry("AF");
        tools.typePhone("3");
        tools.expectPhone("+33");
        tools.expectCountry("FR");
        tools.typePhone("{backspace}");
        tools.expectPhone("+3");
        tools.expectCountry("FR");
        tools.typePhone("2");
        tools.expectPhone("+32");
        tools.expectCountry("BE");
      });

      it("ignores country from invalid phone prefix", () => {
        tools.mount({
          excludeCountries: ["FR"],
        });

        tools.typePhone("+33612345678");
        tools.expectCountry("AF");
        tools.expectPhone("+33612345678");
        tools.expectError(
          'The "Phone" field is not a valid phone number (example: 023 456 7890).',
        );
      });

      it("disables validation", () => {
        tools.mount({
          validate: null,
        });

        tools.typePhone("+33712345678");
        tools.expectCountry("FR");
        tools.expectPhone("+33712345678");
        tools.expectError(null);
      });

      it("excludes countries", () => {
        tools.mount({
          excludeCountries: ["FR", "BE"],
        });

        tools.expectCountrySelectable("AF");
        tools.expectCountrySelectable("AX");
        tools.expectCountryNotSelectable("FR");
        tools.expectCountryNotSelectable("BE");
      });

      it("includes countries", () => {
        tools.mount({
          includeCountries: ["FR", "BE"],
        });

        tools.expectCountryNotSelectable("AF");
        tools.expectCountryNotSelectable("AX");
        tools.expectCountrySelectable("FR");
        tools.expectCountrySelectable("BE");
      });
    });
  });
});
