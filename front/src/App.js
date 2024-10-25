// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';  // Импортируем главную страницу
import { AuthProvider } from './context/AuthContext';
import { CssBaseline, Container } from '@mui/material';

function App() {
    return (
        <AuthProvider>
            <CssBaseline />
            <Container>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />  {/* Теперь главная страница — HomePage */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/dashboard/*" element={<Dashboard />} />
                    </Routes>
                </Router>
            </Container>
        </AuthProvider>
    );
}

export default App;
