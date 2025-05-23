import "./i18n"; // لازم الاستدعاء قبل أي شيء

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap core CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JavaScript (includes Popper)
import MyThemeProvider from "./contexts/theme/ThemeProvider.jsx";
import LanguageProvider from "./contexts/language/LanguageProvider.jsx";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <MyThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </MyThemeProvider>
    </Provider>
  </StrictMode>
);
