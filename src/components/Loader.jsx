import { Button, CircularProgress } from "@mui/material";
import { useMyTheme } from "../contexts/theme/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Loader() {
  const { t } = useTranslation();

  const { myTheme } = useMyTheme();
  return (
    <Button
      disabled
      sx={{
        color: myTheme === "dark" ? "#fff" : "#000",
        "&.Mui-disabled": {
          color: myTheme === "dark" ? "#fff" : "#000",
        },
      }}
      startIcon={
        <CircularProgress
          size={20}
          sx={{ color: myTheme === "dark" ? "#fff" : "#000", ml: 2 }}
        />
      }
    >
      {t("Loading...")}
    </Button>
  );
}
