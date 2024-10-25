// src/pages/HomePage.js
import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Container maxWidth="sm">
            <Box mt={8}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Добро пожаловать в Административную Панель
                </Typography>
                <Typography variant="h6" component="p" gutterBottom>
                    Войдите в систему, чтобы управлять пользователями и намерениями.
                </Typography>
                <Button variant="contained" color="primary" component={Link} to="/login">
                    Войти
                </Button>
            </Box>
        </Container>
    );
};

export default HomePage;
