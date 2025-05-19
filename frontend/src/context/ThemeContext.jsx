import React, { createContext, useState, useEffect } from 'react';

// Create the context
const ThemeContext = createContext();

// Create the provider component
export const ThemeProvider = ({ children }) => {
  // Check if there's a theme preference in localStorage
  const getInitialTheme = () => {
    // Clear any existing theme first to ensure we start fresh
    localStorage.removeItem('theme');
    // Always return light theme as default
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Apply the default theme class to body immediately
  document.body.className = 'theme-light';

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);

    // Apply theme class to the body element
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Context value
  const contextValue = {
    theme,
    setTheme,
    toggleTheme,
    isLightTheme: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
