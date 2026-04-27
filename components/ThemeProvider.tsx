'use client';

import * as React from 'react';

type Theme = 'light' | 'dark' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  storageKey?: string;
  attribute?: 'class';
  disableTransitionOnChange?: boolean;
};

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyDocumentTheme = (
  theme: Theme,
  enableSystem: boolean,
  attribute: 'class',
  disableTransitionOnChange: boolean
) => {
  if (typeof document === 'undefined') {
    return;
  }

  const resolved = theme === 'system' && enableSystem ? getSystemTheme() : theme === 'system' ? 'dark' : theme;
  const root = document.documentElement;

  let cleanup: (() => void) | undefined;
  if (disableTransitionOnChange) {
    const style = document.createElement('style');
    style.appendChild(
      document.createTextNode('*{-webkit-transition:none!important;transition:none!important}')
    );
    document.head.appendChild(style);
    cleanup = () => {
      void window.getComputedStyle(document.body);
      document.head.removeChild(style);
    };
  }

  if (attribute === 'class') {
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
  }

  root.style.colorScheme = resolved;
  cleanup?.();
};

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  enableSystem = true,
  storageKey = 'theme',
  attribute = 'class',
  disableTransitionOnChange = false
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = React.useState<'light' | 'dark'>('dark');

  React.useEffect(() => {
    const savedTheme = typeof window !== 'undefined' ? (window.localStorage.getItem(storageKey) as Theme | null) : null;
    const initialTheme = savedTheme ?? defaultTheme;
    setThemeState(initialTheme);
  }, [defaultTheme, storageKey]);

  React.useEffect(() => {
    const nextResolved = theme === 'system' && enableSystem ? getSystemTheme() : theme === 'system' ? 'dark' : theme;
    setResolvedTheme(nextResolved);
    applyDocumentTheme(theme, enableSystem, attribute, disableTransitionOnChange);
  }, [theme, enableSystem, attribute, disableTransitionOnChange]);

  React.useEffect(() => {
    if (!enableSystem || typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (theme === 'system') {
        const nextResolved = mediaQuery.matches ? 'dark' : 'light';
        setResolvedTheme(nextResolved);
        applyDocumentTheme('system', enableSystem, attribute, disableTransitionOnChange);
      }
    };

    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, [theme, enableSystem, attribute, disableTransitionOnChange]);

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      setThemeState(nextTheme);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(storageKey, nextTheme);
      }
    },
    [storageKey]
  );

  const value = React.useMemo(
    () => ({ theme, setTheme, resolvedTheme }),
    [theme, setTheme, resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}