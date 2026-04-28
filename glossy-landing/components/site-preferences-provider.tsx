"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";
type Locale = "en" | "am";

type SitePreferencesContextValue = {
  theme: Theme;
  locale: Locale;
  setTheme: (theme: Theme) => void;
  setLocale: (locale: Locale) => void;
  toggleTheme: () => void;
  toggleLocale: () => void;
};

const SitePreferencesContext = createContext<SitePreferencesContextValue | null>(null);

const STORAGE_THEME_KEY = "glossy-theme";
const STORAGE_LOCALE_KEY = "glossy-locale";

export function SitePreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const storedTheme = window.localStorage.getItem(STORAGE_THEME_KEY);
    return storedTheme === "dark" || storedTheme === "light" ? storedTheme : "light";
  });
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return "en";
    }

    const storedLocale = window.localStorage.getItem(STORAGE_LOCALE_KEY);
    return storedLocale === "am" || storedLocale === "en" ? storedLocale : "en";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.body.dataset.theme = theme;
    document.body.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(STORAGE_THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = locale === "am" ? "am" : "en";
    window.localStorage.setItem(STORAGE_LOCALE_KEY, locale);
  }, [locale]);

  return (
    <SitePreferencesContext.Provider
      value={{
        theme,
        locale,
        setTheme,
        setLocale,
        toggleTheme: () => setTheme((value) => (value === "light" ? "dark" : "light")),
        toggleLocale: () => setLocale((value) => (value === "en" ? "am" : "en")),
      }}
    >
      {children}
    </SitePreferencesContext.Provider>
  );
}

export function useSitePreferences() {
  const context = useContext(SitePreferencesContext);

  if (!context) {
    throw new Error("useSitePreferences must be used within SitePreferencesProvider");
  }

  return context;
}
