import { createSignal, createEffect } from "solid-js";
import type { WeatherData } from "../pages/api/weather";

interface Props {
  withInput?: boolean;
}

export default function WeatherWidget(props: Props) {
  const [weatherData, setWeatherData] = createSignal<WeatherData | null>(null);

  // check if we have the city in local storage
  let defaultCity = "Hamburg";
  if (typeof window !== "undefined") {
    defaultCity = localStorage.getItem("city") || defaultCity;
  }

  const [city, setCity] = createSignal<string>(defaultCity);

  createEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`/api/weather?city=${city()}`);
        const data = await response.json();
        setWeatherData(() => ({
          ...data,
          weather: [
            {
              ...data.weather[0],
              icon: `//openweathermap.org/img/wn/${data.weather[0].icon}.png`,
            },
          ],
        }));
      } catch (error) {
        // what should we do here? maybe hide the widget? or retry after a while?
      }
    };

    fetchWeatherData();
  });

  const cityChange = (event: Event) => {
    const newCity = (event.target as HTMLInputElement).value;
    if (typeof window !== "undefined") {
      localStorage.setItem("city", newCity);
    }
    setCity(newCity);
  };

  return (
    <div>
      {props.withInput && (
        <input type="text" value={city()} onInput={cityChange} />
      )}

      {weatherData() ? (
        <>
          <img src={weatherData()!.weather[0].icon} alt="Weather Icon" />
          {weatherData()!.weather[0].description}
          {weatherData()!.main.temp} °C
          {weatherData()!.name}
        </>
      ) : (
        <>...</>
      )}
    </div>
  );
}
