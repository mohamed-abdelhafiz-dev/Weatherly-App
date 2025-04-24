import { useEffect } from "react";

import ForecastDayCard from "./ForecastDayCard";
import MainCard from "./MainCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "../redux/slices/weatherDateSlice";
import { openSnackbar } from "../redux/slices/snackbarSlice";

export default function Main() {
  const weatherData = useSelector((state) => state.weatherData.data);
  const error = useSelector((state) => state.weatherData.error);
  const fetchIsPending = useSelector(
    (state) => state.weatherData.fetchIsPending
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeatherData());
  }, []);
  useEffect(() => {
    if (error.description) {
      dispatch(openSnackbar(error));
    }
  }, [error]);

  let mainCard = [];
  let forecastDayCards = [];

  if (weatherData) {
    const weatherCards = weatherData.daily.map((weatherDataItem, index) => {
      return index === 0 ? (
        <MainCard
          key={index}
          weatherData={weatherDataItem}
          city={weatherData.city}
        />
      ) : (
        <ForecastDayCard key={index} weatherData={weatherDataItem} />
      );
    });

    mainCard = weatherCards[0];
    forecastDayCards = weatherCards.slice(1);
  }

  return (
    <main className="main-content">
      {fetchIsPending ? <Loader /> : null}
      {mainCard}
      <div className="forecast">{forecastDayCards}</div>
    </main>
  );
}
