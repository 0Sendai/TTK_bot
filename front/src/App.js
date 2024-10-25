// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import { AuthProvider } from './context/AuthContext';
import { lightTheme, darkTheme } from './theme';

function App() {
    const [theme, setTheme] = useState('light');

    // Функция переключения темы
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <AuthProvider>
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                <CssBaseline />
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={<HomePage toggleTheme={toggleTheme} isDarkMode={theme === 'dark'} />}
                        />
                        <Route
                            path="/login"
                            element={<LoginPage toggleTheme={toggleTheme} isDarkMode={theme === 'dark'} />}
                        />
                        <Route
                            path="/dashboard/*"
                            element={<Dashboard toggleTheme={toggleTheme} isDarkMode={theme === 'dark'} />}
                        />
                    </Routes>
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
