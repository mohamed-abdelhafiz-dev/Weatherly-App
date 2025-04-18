import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { useMyTheme } from "../contexts/theme/ThemeContext";
import { useLanguage } from "../contexts/language/LanguageContext";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();

  const { myTheme, toggleMyTheme } = useMyTheme();
  const { language, changeLanguage } = useLanguage();
  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
    i18n.changeLanguage(
      event.target.value?.toLowerCase() === "english" ? "en" : "ar"
    ); // تحديث اللغة في i18n
  };
  return (
    <header
      className="header"
      style={{ padding: "1rem", position: "sticky", top: 0, zIndex: 1000 }}
    >
      <nav
        className="navbar navbar-expand-sm"
        style={{ width: "100%", padding: "0px" }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand"
            onClick={() => window.scrollTo(0, 0)}
            style={{
              color: myTheme === "dark" ? "white" : "black",
              cursor: "pointer",
            }}
          >
            <div className="logo">🌦️ Weatherly</div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ justifyContent: "flex-end" }}
          >
            <form className="d-flex" role="search">
              <div className="controls">
                {/* <!-- Language dropdown --> */}
                <FormControl sx={{ minWidth: 100 }} size="small">
                  <Select
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          "@media (max-width: 575.98px)": {
                            backgroundColor:
                              myTheme === "dark"
                                ? "rgba(160, 160, 160)"
                                : "auto",
                          },
                        },
                      },
                    }}
                    value={language}
                    onChange={handleLanguageChange}
                    sx={{
                      "& .MuiSelect-icon": {
                        color: myTheme === "dark" ? "white" : "black",
                      },
                      color: myTheme === "dark" ? "white" : "black",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                          myTheme === "dark"
                            ? "rgba(255, 255, 255, 0.3)"
                            : "rgba(0, 0, 0, 0.3)", // default border color
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                          myTheme === "dark"
                            ? "rgba(255, 255, 255, 0.6)"
                            : "rgba(0, 0, 0, 0.6)", // on hover
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                          myTheme === "dark"
                            ? "rgba(255, 255, 255, 0.8)"
                            : "rgba(0, 0, 0, 0.8)", // on focus
                      },
                    }}
                  >
                    <MenuItem
                      value="english"
                      sx={{ color: myTheme === "dark" ? "white" : "black" }}
                    >
                      {t("English")}
                    </MenuItem>
                    <MenuItem
                      value="arabic"
                      sx={{ color: myTheme === "dark" ? "white" : "black" }}
                    >
                      {t("Arabic")}
                    </MenuItem>
                  </Select>
                </FormControl>
                {/* <!-- Dark mode toggle button --> */}
                <Button
                  sx={{
                    color: myTheme === "dark" ? "white" : "black",
                    textTransform:"capitalize",
                    borderColor:
                      myTheme === "dark"
                        ? "rgba(255, 255, 255, 0.3)"
                        : "rgba(0, 0, 0, 0.3)",
                    "&:hover": {
                      borderColor:
                        myTheme === "dark"
                          ? "rgba(255, 255, 255, 0.6)"
                          : "rgba(0, 0, 0, 0.6)",
                    },
                    "&.Mui-focused": {
                      borderColor:
                        myTheme === "dark"
                          ? "rgba(255, 255, 255, 0.8)"
                          : "rgba(0, 0, 0, 0.8)",
                    },
                    "& .MuiButton-startIcon, & .MuiButton-endIcon": {
                      color: myTheme === "dark" ? "white" : "black",
                    },
                  }}
                  variant="outlined"
                  className="theme-toggle"
                  onClick={toggleMyTheme}
                >
                  {t(
                    myTheme === "dark"
                      ? "🌞 Toggle Light Mode"
                      : "🌓 Toggle Dark Mode"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
