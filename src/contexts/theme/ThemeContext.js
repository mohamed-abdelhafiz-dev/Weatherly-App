import { createContext, useContext } from "react";

export const ThemeContext = createContext([]);
export const useMyTheme = () => useContext(ThemeContext);
