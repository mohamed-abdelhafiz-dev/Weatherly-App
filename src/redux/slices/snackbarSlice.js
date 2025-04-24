import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    message: {
      title: "",
      description: "",
    },
  },
  reducers: {
    closeSnackbar: (state) => {
      state.open = false;
    },
    openSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload;
    },
  },
});
export default snackbarSlice.reducer;
export const { closeSnackbar, openSnackbar } = snackbarSlice.actions;
