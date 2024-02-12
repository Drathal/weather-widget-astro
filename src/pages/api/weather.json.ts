import type { APIRoute } from "astro";
import qs from "qs";

// we shoulkd dynamically import the fixture
import fixture from "../../fixtures/weather-hamburg.json";

const apiKey: string = import.meta.env.PUBLIC_ApiKey;
// this could be a secret/config in a real app
const units: string = "metric";
const lang: string = "de";

export interface WeatherData {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Coord {
  lon: number;
  lat: number;
}

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
export const GET: APIRoute = async ({ params, request }) => {
  const parsedParams = qs.parse(request.url.split("?")[1] || "");
  let city = (parsedParams.city as string) || "";
  let lon = (parsedParams.lon as string) || "";
  let lat = (parsedParams.lat as string) || "";

  // the url with placeholders could also be a config in a real app
  const apiUrlCity: string = `https://api.openweathermap.org/data/2.5/weather?units=${units}&appid=${apiKey}&q=${
    city || "Hamburg "
  }&lang=${lang}`;
  const apiUrlGeo: string = `https://api.openweathermap.org/data/2.5/weather?units=${units}&appid=${apiKey}&lon=${lon}&lat=${lat}&lang=${lang}`;

  if (lon && lat) {
    var apiUrl = apiUrlGeo;
  } else {
    var apiUrl = apiUrlCity;
  }

  console.log(parsedParams, apiUrl);

  // just for development
  if (import.meta.env.PUBLIC_UseFixture === "true") {
    if (lat) fixture.coord.lat = parseInt(lat);
    if (lon) fixture.coord.lon = parseInt(lon);
    if (lon && lat) fixture.name = `Your Location`;
    if (!city) fixture.name = "Hamburg, Germany";
    if (city) fixture.name = city;

    return new Response(JSON.stringify(fixture), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // we dont trust the user, i use a simple regex to remove all non-letter characters
  // lon lat should also be sanitized
  city = city.replace(/[^a-zA-Z]/g, "");

  // in real life, you would probably want to cache the response and use a library like `axios`
  try {
    const response: Response = await fetch(apiUrl);
    const data: WeatherData = await response.json();
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
};
