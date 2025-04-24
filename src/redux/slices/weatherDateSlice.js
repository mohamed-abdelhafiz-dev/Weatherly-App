import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import formatDailyForecast from "../../formatDailyForecast";
import axios from "axios";
function getUserLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = position.coords;
        resolve(location);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
export const fetchWeatherData = createAsyncThunk(
  "fetchingWeatherData",
  async (_, thunkAPI) => {
    try {
      const location = await getUserLocation();
      const apiKey = "a004bdb7129602b117f76a9d41177deb";
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${apiKey}`;
      const response = await axios.get(url);
      const data = response.data;
      let dailyFormatted;
      dailyFormatted = formatDailyForecast(data.list);
      dailyFormatted = dailyFormatted.slice(0, 5);
      return {
        city: data.city.name,
        daily: dailyFormatted,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error?.message
      );
    }
  }
);

const weatherDataSlice = createSlice({
  name: "weatherData",
  initialState: {
    data: null,
    error: {
      title: "Error",
      description: "",
    },
    fetchIsPending: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.fetchIsPending = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherData.pending, (state) => {
        state.fetchIsPending = true;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        if (action.payload === "User denied Geolocation") {
          state.error = {
            title: "Location Access Denied",
            description:
              "Please allow location access to view the weather data, then refresh the page.",
          };
        } else {
          state.error.description = action.payload;
        }
      });
  },
});
export default weatherDataSlice.reducer;
