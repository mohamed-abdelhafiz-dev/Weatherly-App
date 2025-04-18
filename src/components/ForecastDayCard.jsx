import moment from "moment";
import { useTranslation } from "react-i18next";
export default function ForecastDayCard({ weatherData }) {
  const { t } = useTranslation();

  return (
    <div className="forecast-day">
      <div className="weather-icon">
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={t(weatherData.weather[0].description)}
          title={t(weatherData.weather[0].description)}
        />
      </div>
      <div>{t(moment(weatherData.dt_txt).format("dddd"))}</div>
      <div>{weatherData.main.temp_max}°C</div>
    </div>
  );
}
