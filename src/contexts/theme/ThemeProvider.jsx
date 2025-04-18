import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

export default function MyThemeProvider({ children }) {
  const [myTheme, setTheme] = useState(
    localStorage.getItem("myTheme") || "light"
  );
  const toggleMyTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    localStorage.setItem("myTheme", myTheme === "light" ? "dark" : "light");
  };
  return (
    <ThemeContext.Provider value={{ myTheme, toggleMyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
