// src/pages/HomePage.js
import React from 'react';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const HomePage = ({ toggleTheme, isDarkMode }) => {
    return (
        <>
            <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} isAuthPage={true} />
            <Container maxWidth="md">
                <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: 'center' }}>
                    <Typography variant="h3" gutterBottom>
                        Добро пожаловать в Административную Панель
                    </Typography>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                        Пожалуйста, войдите, чтобы управлять пользователями и намерениями.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        component={Link}
                        to="/login"
                        sx={{ mt: 4 }}
                    >
                        Войти
                    </Button>
                </Paper>
            </Container>
        </>
    );
};

export default HomePage;
