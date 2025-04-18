export default function formatDailyForecast(forecastList) {
  const grouped = {};

  forecastList.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0];
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(entry);
  });

  const daily = Object.entries(grouped).map(([date, entries]) => {
    const temps = entries.map((e) => e.main.temp);
    const feels = entries.map((e) => e.main.feels_like);
    const minTemps = entries.map((e) => e.main.temp_min);
    const maxTemps = entries.map((e) => e.main.temp_max);
    const pressures = entries.map((e) => e.main.pressure);
    const humidities = entries.map((e) => e.main.humidity);

    const windSpeeds = entries.map((e) => e.wind.speed);
    const windDegs = entries.map((e) => e.wind.deg);

    const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

    return {
      dt: entries[0].dt,
      dt_txt: `${date} 00:00:00`,
      main: {
        temp: parseFloat(avg(temps).toFixed(2)),
        feels_like: parseFloat(avg(feels).toFixed(2)),
        temp_min: Math.min(...minTemps),
        temp_max: Math.max(...maxTemps),
        pressure: Math.round(avg(pressures)),
        humidity: Math.round(avg(humidities)),
      },
      wind: {
        speed: parseFloat(avg(windSpeeds).toFixed(2)),
        deg: Math.round(avg(windDegs)),
      },
      weather: [
        {
          ...entries[0].weather[0],
        },
      ],
    };
  });

  return daily;
}
