import { createContext, useContext } from "react";

export const SnackbarContent = createContext(null);
export function useSnackbar() {
  return useContext(SnackbarContent);
}
