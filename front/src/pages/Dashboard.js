// src/pages/Dashboard.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserManagement from '../components/Dashboard/UserManagement';
import IntentManagement from '../components/Dashboard/IntentManagement';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { Box } from '@mui/material';

const Dashboard = ({ toggleTheme }) => {
    const { auth } = useAuth();

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <Box>
            <Header toggleTheme={toggleTheme} isDarkMode={auth.role === 'dark'} />
            <Box p={3}>
                <Routes>
                    <Route path="intents" element={<IntentManagement />} />
                    {auth.role === 'admin' && (
                        <Route path="users" element={<UserManagement />} />
                    )}
                </Routes>
            </Box>
        </Box>
    );
};

export default Dashboard;
