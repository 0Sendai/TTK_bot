// src/components/Auth/Login.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import CryptoJS from 'crypto-js';  // crypto-js для хэширования

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Хэшируем пароль
        const hashedPassword = CryptoJS.SHA256(password).toString();

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password: hashedPassword }),
            });

            const result = await response.json();

            if (result.success) {
                setIsVisible(false);
                setTimeout(() => {
                    login(result.role);
                    navigate('/dashboard');
                }, 500);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Ошибка при подключении к серверу');
        }
    };

    return (
        <Container maxWidth="xs">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -50 }}
                transition={{ duration: 0.5 }}
            >
                <Paper elevation={4} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Вход
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Логин"
                            variant="outlined"
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Пароль"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <Typography color="error">{error}</Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2, p: 1 }}
                        >
                            Войти
                        </Button>
                    </form>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default Login;
