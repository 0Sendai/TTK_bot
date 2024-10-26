// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Header = ({ toggleTheme, isDarkMode, isAuthPage }) => {
    const { auth, logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Логотип и надпись "Админ-панель" */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <img src={logo} alt="Company Logo" style={{ width: 120, height: 40, marginRight: 10 }} />
                    <Typography variant="h6">
                        Админ-панель
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Кнопки отображаются только если это не HomePage и не LoginPage */}
                    {!isAuthPage && (
                        <>
                            <Button color="inherit" component={Link} to="/dashboard/intents">
                                Настройки намерений
                            </Button>
                            {/* Условный рендеринг кнопки для администратора */}
                            {auth.is_admin && (
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
