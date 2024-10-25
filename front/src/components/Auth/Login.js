// src/components/Auth/Login.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if ((username === 'admin' && password === 'admin') ||
            (username === 'editor' && password === 'editor')) {

            // Скрываем форму с анимацией
            setIsVisible(false);

            // Ждем завершения анимации и выполняем переход
            setTimeout(() => {
                login(username === 'admin' ? 'admin' : 'editor');
                navigate('/dashboard');
            }, 500); // Задержка совпадает с продолжительностью анимации
        } else {
            alert('Неверные данные для входа');
        }
    };

    return (
        <Container maxWidth="xs">
            {/* Анимация появления/исчезновения формы */}
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
