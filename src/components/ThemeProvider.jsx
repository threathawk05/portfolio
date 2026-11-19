import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);
const modes = ['system', 'light', 'dark'];

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => document.documentElement.dataset.themeMode || 'system');

  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = () => {
      root.dataset.themeMode = mode;
      root.dataset.theme = mode === 'system' ? getSystemTheme() : mode;
      const themeColor = document.querySelector('meta[name="theme-color"]');
      if (themeColor) themeColor.content = root.dataset.theme === 'dark' ? '#101112' : '#f5f0ec';
    };

    applyTheme();
    try {
      localStorage.setItem('portfolio-theme', mode);
    } catch (error) {
      console.warn('Theme preference could not be saved in this browser.', error);
    }

    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
    if (mode === 'system') {
      systemPreference.addEventListener('change', applyTheme);
      return () => systemPreference.removeEventListener('change', applyTheme);
    }
    return undefined;
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      cycleMode: () =>
        setMode((current) => modes[(modes.indexOf(current) + 1) % modes.length]),
    }),
    [mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider.');
  return context;
}
