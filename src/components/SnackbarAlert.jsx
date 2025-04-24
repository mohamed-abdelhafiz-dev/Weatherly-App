import { Snackbar, Alert, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useMyTheme } from "../contexts/theme/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../redux/slices/snackbarSlice";
import { useTranslation } from "react-i18next";
export default function SnackbarAlert() {
  const { open, message } = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();
  const { myTheme } = useMyTheme();

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    dispatch(closeSnackbar());
  };

  const { t } = useTranslation();

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
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
        <strong>{t(message.title)}</strong>
        <div>{t(message.description)}</div>
      </Alert>
    </Snackbar>
  );
}
