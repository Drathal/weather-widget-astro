const defaultOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const getGeoLocation = (
  callback: (pos: GeolocationPosition) => void,
  error: (err: GeolocationPositionError) => void = () => {},
  optiopns: PositionOptions = defaultOptions
) => navigator.geolocation.getCurrentPosition(callback, error, optiopns);

export default getGeoLocation;
