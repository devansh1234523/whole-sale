import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <span className="theme-toggle-icon">🌙</span>
      ) : (
        <span className="theme-toggle-icon">☀️</span>
      )}
    </button>
  );
};

export default ThemeToggle;
