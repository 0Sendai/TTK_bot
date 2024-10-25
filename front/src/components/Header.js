// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = ({ toggleTheme, isDarkMode, isAuthPage }) => {
    const { auth, logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Админ-панель
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Кнопки отображаются только если это не HomePage и не LoginPage */}
                    {!isAuthPage && (
                        <>
                            <Button color="inherit" component={Link} to="/dashboard/intents">
                                Настройки намерений
                            </Button>
                            {auth.role === 'admin' && (
                                <Button color="inherit" component={Link} to="/dashboard/users">
                                    Управление пользователями
                                </Button>
                            )}
                            <Button color="inherit" onClick={logout}>
                                Выйти
                            </Button>
                        </>
                    )}
                    {/* Переключатель темы */}
                    <IconButton color="inherit" onClick={toggleTheme}>
                        {isDarkMode ? <LightMode /> : <DarkMode />}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
