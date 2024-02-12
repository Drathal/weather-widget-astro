/**
 *ideally we should render the widget also on the server side to have no flickering
 */
import { createSignal, createEffect, createMemo, onCleanup } from "solid-js";
import {
  createFetch,
  withTimeout,
  withAbort,
  withCache,
  withCatchAll,
} from "@solid-primitives/fetch";

import type { WeatherData } from "../pages/api/weather.json";
import IconCevron from "../components/IconCevron";
import clickOutside from "../lib/clickOutside";
import getGeoLocation from "../lib/geoLocation";

interface QueryParams {
  city?: string;
  lon?: string;
  lat?: string;
}

interface Props {
  withInput?: boolean;
  defaultCity?: string;
  withGeolocation?: boolean;
}

export default function WeatherWidget({
  withInput = false,
  defaultCity = "Hamburg", // can also be read from a config / env file
  withGeolocation = false,
}: Props) {
  let inputRef: HTMLInputElement | undefined = undefined;

  if (withInput) defaultCity = localStorage.getItem("city") || defaultCity;

  const [showInput, setShowInput] = createSignal(false);
  const [isVisible, setIsVisible] = createSignal(false);
  const [url, setUrl] = createSignal<string>();
  const [weatherResult, { abort }] = createFetch<WeatherData>(url, {}, [
    withCatchAll(),
  ]);
  const [queryParams, setQueryParams] = createSignal<QueryParams>({
    city: "",
    lon: "",
    lat: "",
  });

  const query = createMemo(() => {
    if (queryParams().city) {
      return `?city=${queryParams().city}`;
    } else if (queryParams().lon && queryParams().lat) {
      return `?lon=${queryParams().lon}&lat=${queryParams().lat}`;
    }

    return `?city=${defaultCity}`;
  });

  const geoLocationSuccess = (pos: GeolocationPosition) => {
    setQueryParams((oldQuerPrarams) => ({
      city: oldQuerPrarams.city,
      lat: pos.coords.latitude.toString(),
      lon: pos.coords.longitude.toString(),
    }));
  };

  if (withGeolocation && !localStorage.getItem("city")) {
    getGeoLocation(geoLocationSuccess);
  }

  const fetchWeatherData = async () => {
    setUrl(`api/weather.json${query()}`);
    setTimeout(() => setIsVisible(true), 50);
  };

  createEffect(fetchWeatherData);

  const submitHandler = (event: KeyboardEvent) => {
    if (event.key !== "Enter") {
      return;
    }

    const newCity = (event.target as HTMLInputElement).value;
    localStorage.setItem("city", newCity);

    setQueryParams((oldQuerPrarams) => ({
      city: newCity,
      lat: oldQuerPrarams.lat,
      lon: oldQuerPrarams.lon,
    }));

    setShowInput(false);
  };

  const showInputHandler = () => {
    setShowInput(true);
    inputRef?.focus();
  };

  return (
    <>
      {weatherResult()?.name ? (
        <div
          class={`bg-slate-100 dark:bg-slate-800 relative flex justify-center h-11 lg:h-12 lg:min-w-48 text-xs border border-slate-300 dark:border-slate-900 rounded-md leading-4 transition-opacity ${
            isVisible() ? "opacity-1" : "opacity-0"
          }`}
        >
          {showInput() && (
            <div
              use:clickOutside={() => setShowInput(false)}
              class="absolute top-0 left-0 right-0 bottom-0 border border-slate-600 rounded-md bg-white dark:bg-slate-800 z-10 overflow-hidden"
            >
              <input
                ref={inputRef}
                type="text"
                value={queryParams().city}
                onKeyDown={submitHandler}
                placeholder="Stadt"
                class="h-full w-full pl-2 mr-8 rounded-md bg-transparent focus:outline-none"
              />
            </div>
          )}

          <div
            class="w-14 h-full bg-bottom bg-no-repeat font-bold flex justify-center items-end p-1 ml-1 "
            style={{
              "background-image": `url(//openweathermap.org/img/wn/${
                weatherResult()!.weather[0].icon
              }.png)`,
            }}
          >
            <span class="drop-shadow-glow dark:drop-shadow-glowdark">
              {Math.round(weatherResult()!.main.temp)} °C
            </span>
          </div>

          <div class="flex items-center justify-start w-full h-full ps-1">
            {weatherResult()!.name}
            <br />
            {weatherResult()!.weather[0].description}
          </div>

          {withInput && (
            <div
              onClick={() => showInputHandler()}
              class="w-8 h-full border-l border-slate-300 dark:border-slate-900 px-1 cursor-pointer "
            >
              <IconCevron />
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
