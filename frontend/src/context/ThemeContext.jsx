import React, { createContext, useState, useEffect } from 'react';

// Create the context
const ThemeContext = createContext();

// Create the provider component
export const ThemeProvider = ({ children }) => {
  // Check if there's a theme preference in localStorage
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    // Return saved theme if it exists, otherwise default to light
    return savedTheme || 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Update localStorage and apply theme class when theme changes
  useEffect(() => {
    // Save theme to localStorage
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
