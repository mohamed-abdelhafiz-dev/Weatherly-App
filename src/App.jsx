import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import { createTheme, ThemeProvider } from "@mui/material";
import { useMyTheme } from "./contexts/theme/ThemeContext";
import { useLanguage } from "./contexts/language/LanguageContext";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import SnackbarAlert from "./components/SnackbarAlert";

function App() {
  const { i18n } = useTranslation();
  const { myTheme } = useMyTheme();
  const { language } = useLanguage();
  useEffect(() => {
    i18n.changeLanguage(language === "arabic" ? "ar" : "en");
  }, [language]);
  const theme = createTheme({
    palette: {
      background: {
        paper: myTheme === "dark" ? "rgba(255, 255, 255, 0.6)" : "#fff",
      },
    },
    typography: {
      color: myTheme === "dark" ? "#fff" : "#000",
      fontFamily: "Roboto, sans-serif",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div
        className={`app ${myTheme}`}
        dir={language === "arabic" ? "rtl" : "ltr"}
        lang={language === "arabic" ? "ar" : "en"}
      >
        <Header />
        <Main />
        <Footer />
        <SnackbarAlert />
      </div>
    </ThemeProvider>
  );
}

export default App;
