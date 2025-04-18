import { useState } from "react";
import { SnackbarContent } from "./SnackbarContext";
import SnackbarAlert from "../../components/SnackbarAlert";

export default function SnackbarProvider({ children }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  return (
    <SnackbarContent.Provider value={{ openSnackbar, setOpenSnackbar }}>
      {children}
      <SnackbarAlert
        message={{
          title: "Location Access Denied",
          description:
            "Please allow location access to get the weather data and then reload the page.",
        }}
        autoHideDuration={5000}
      />
    </SnackbarContent.Provider>
  );
}
