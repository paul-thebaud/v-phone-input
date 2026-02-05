import fs from "node:fs";

const extractPropertiesList = (file: string) => {
  const content = fs.readFileSync(`./docs/api/${file}.md`).toString();

  return content
    .split("## Properties")[1]
    .match(/\n### [a-z:-]+\??\n/gi)
    .map((match: string) => {
      const property = match.match(/[a-z:-]+/i)?.[0];

      let propertyHash = property;
      if (propertyHash === "country" || propertyHash === "countryInputComponent") {
        propertyHash = `${propertyHash}-1`;
      }

      return `- [${property}](/api/${file}#${propertyHash})`;
    })
    .join("\n");
};

fs.writeFileSync(
  "./docs/api/variables/VPhoneInput.md",
  fs
    .readFileSync("./docs/api/variables/VPhoneInput.md")
    .toString()
    .replace(
      "__properties__",
      extractPropertiesList("interfaces/VPhoneInputProps"),
    )
    .replace("__slots__", extractPropertiesList("interfaces/VPhoneInputSlots"))
    .replace("__emits__", extractPropertiesList("interfaces/VPhoneInputEmits"))
    .replace(
      "__exposed__",
      extractPropertiesList("interfaces/VPhoneInputExposed"),
    ),
);

const usePhoneInput = fs
  .readFileSync("./docs/api/functions/usePhoneInput.md")
  .toString();

fs.writeFileSync(
  "./docs/api/functions/usePhoneInput.md",
  `${usePhoneInput.replace(
    "## Returns",
    `${extractPropertiesList("interfaces/VPhoneInputComposableOptions")}\n## Returns`,
  )}${extractPropertiesList("interfaces/VPhoneInputComposable")}\n`,
);
