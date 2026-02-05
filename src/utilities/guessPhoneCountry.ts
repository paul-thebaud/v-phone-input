/**
 * Guess phone country using ip2c.org service.
 *
 * @see https://about.ip2c.org/
 */
export default async function guessPhoneCountry() {
  let response: Response;
  let responseText: string;
  try {
    response = await fetch("https://ip2c.org/s");
    responseText = await response.text();
  } catch (_) {
    return undefined;
  }

  const countryData = responseText.toString().split(";");
  if (!countryData || countryData[0] !== "1") {
    return undefined;
  }

  return countryData[1];
}
