import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        const root = window.document.documentElement;
        // Remove all possible theme classes
        root.classList.remove('dark', 'cyber-neon', 'purple-ai', 'dark-matrix', 'sunset', 'hacker');
        
        // Add current theme if not light
        if (theme !== 'light') {
            root.classList.add(theme);
        }
        
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
