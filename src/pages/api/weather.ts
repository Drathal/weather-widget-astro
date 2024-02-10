// we shoulkd dynamically import the fixture
import fixture from "../../fixtures/weather-hamburg.json";

const apiKey: string = import.meta.env.PUBLIC_ApiKey;
// this could be a secret/config in a real app
const units: string = "metric";
const lang: string = "de";

type Params = {
  city?: String;
};

/**
 * query the openweathermap api for the current weather of a city
 * TODO: fetch data for the given longitude and latitude
 *
 * @param searchParams - the search params of the request
 * @param city - the city to search for
 *
 * @returns a response with the weather data
 * @throws a 500 error if the request fails
 * @example fetch("/api/weather?city=Hamburg")
 */
export async function GET(params: Params): Promise<Response> {
  console.log(import.meta.env.PUBLIC_UseFixture);
  if (import.meta.env.PUBLIC_UseFixture) {
    return new Response(JSON.stringify(fixture), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  let city = params.city || "Hamburg";

  // TODO: add support for longitude and latitude
  // TODO: look at Doc to find out how to use the api, we always get the location where im from.
  // the url with placeholders could also be a config in a real app
  const apiUrl: string = `https://api.openweathermap.org/data/2.5/weather?units=${units}&appid=${apiKey}&q=${city}&lang=${lang}`;

  // we dont trust the user, i use a simple regex to remove all non-letter characters
  city = city.replace(/[^a-zA-Z]/g, "");

  // in real life, you would probably want to cache the response and use a library like `axios`
  try {
    const response: Response = await fetch(apiUrl);
    const data: any = await response.json(); // TODO: Add type
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch weather data" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
