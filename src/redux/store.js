import { configureStore } from "@reduxjs/toolkit";
import weatherDataReducer from "./slices/weatherDateSlice";
import snackbarReducer from "./slices/snackbarSlice";
export default configureStore({
  reducer: {
    weatherData: weatherDataReducer,
    snackbar: snackbarReducer,
  },
});
