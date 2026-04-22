import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext } from "./theme.context";

const THEME_KEY = "inv_theme_v3";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState<boolean>(
    () => localStorage.getItem(THEME_KEY) === "true"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-dark", String(dark));
    localStorage.setItem(THEME_KEY, String(dark));
  }, [dark]);

  const toggleTheme = () => setDark((d) => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}