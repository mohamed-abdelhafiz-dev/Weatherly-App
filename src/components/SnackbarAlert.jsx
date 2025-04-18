import { Snackbar, Alert, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useSnackbar } from "../contexts/snackbar/SnackbarContext";
import { useMyTheme } from "../contexts/theme/ThemeContext";

export default function SnackbarAlert({ message, autoHideDuration = 5000 }) {
  const { openSnackbar, setOpenSnackbar } = useSnackbar();
  const { myTheme } = useMyTheme();

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        severity={message.type || "error"}
        onClose={handleClose}
        action={
          <IconButton size="small" color="inherit" onClick={handleClose}>
            <Close fontSize="small" />
          </IconButton>
        }
        sx={{
          width: "100%",
          backgroundColor: myTheme === "dark" ? "#1C1C2E" : "#FFFFFF",
          color: myTheme === "dark" ? "#FFFFFFCC" : "#1C1C2E",
          boxShadow:
            myTheme === "dark"
              ? "0px 2px 10px rgba(0,0,0,0.6)"
              : "0px 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <strong>{message.title}</strong>
        <div>{message.description}</div>
      </Alert>
    </Snackbar>
  );
}
