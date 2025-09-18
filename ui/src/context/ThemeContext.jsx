import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return false; // safe SSR fallback
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // apply theme class to <html>
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // react to system theme changes (if no explicit preference saved)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) setIsDarkMode(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // actions
  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const setLightMode = () => setIsDarkMode(false);
  const setDarkMode = () => setIsDarkMode(true);

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleTheme, setLightMode, setDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// custom hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}