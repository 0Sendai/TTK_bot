// src/pages/LoginPage.js
import React from 'react';
import { Container } from '@mui/material';
import Header from '../components/Header';
import Login from '../components/Auth/Login';

const LoginPage = ({ toggleTheme, isDarkMode }) => {
    return (
        <>
            <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} isAuthPage={true} />
            <Container maxWidth="xs">
                <Login />
            </Container>
        </>
    );
};

export default LoginPage;
