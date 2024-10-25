// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { auth, logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Панель управления
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
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
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
