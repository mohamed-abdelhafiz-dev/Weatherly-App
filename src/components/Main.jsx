import axios from "axios";
import { useEffect, useState } from "react";
import { useSnackbar } from "../contexts/snackbar/SnackbarContext";
import ForecastDayCard from "./ForecastDayCard";
import MainCard from "./MainCard";
import Loader from "./Loader";
import formatDailyForecast from "../formatDailyForecast";

export default function Main() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const { setOpenSnackbar } = useSnackbar();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = position.coords;
        setLocation(location);
      },
      (err) => {
        if (err.message === "User denied Geolocation") {
          setOpenSnackbar(true);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (location) {
      const apiKey = "a004bdb7129602b117f76a9d41177deb";
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${apiKey}`;

      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          let dailyFormatted;
          dailyFormatted = formatDailyForecast(data.list);
          dailyFormatted = dailyFormatted.slice(0, 5);
          setWeatherData({
            city: data.city.name,
            daily: dailyFormatted,
          });
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [location]); // 🔁 re-run when `location` changes
  //

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
        <ForecastDayCard
          key={index}
          weatherData={weatherDataItem}

        />
      );
    });

    mainCard = weatherCards[0];
    forecastDayCards = weatherCards.slice(1);
  }

  return (
    <main className="main-content">
      {!weatherData && <Loader />}
      {mainCard}
      <div className="forecast">{forecastDayCards}</div>
    </main>
  );
}
