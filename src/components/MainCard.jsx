import { useTranslation } from "react-i18next";

export default function MainCard({ weatherData, city }) {
  const { t } = useTranslation();

  return (
    <div className="weather-card">
      <div className="weather-icon">
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={t(weatherData.weather[0].description)}
          title={t(weatherData.weather[0].description)}
        />
      </div>
      <h2 id="location">{t(city)}</h2>
      <h3 id="temperature">{`${weatherData.main.temp_max}°C`}</h3>
      <p id="description">{t(weatherData.weather[0].description)}</p>
      <p id="details">
        {`${t("wind")}: ${weatherData.wind.speed}km/h , `}
        {`${t("Humidity")}: ${weatherData.main.humidity}%`}
      </p>
    </div>
  );
}
