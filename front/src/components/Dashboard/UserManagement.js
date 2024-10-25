// src/components/Dashboard/UserManagement.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItem } from '@mui/material';

const UserManagement = () => {
    const [admins, setAdmins] = useState([]);
    const [newAdmin, setNewAdmin] = useState({ admin_login: '', password: '', is_admin: false });

    // Получение списка администраторов
    useEffect(() => {
        fetch('http://localhost:5000/admins')
            .then(response => response.json())
            .then(data => setAdmins(data))
            .catch(error => console.error("Error fetching admins:", error));
    }, []);

    // Добавление нового администратора
    const addAdmin = async () => {
        const response = await fetch('http://localhost:5000/admins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAdmin)
        });

        const result = await response.json();
        if (result.success) {
            setAdmins([...admins, { admin_login: newAdmin.admin_login, is_admin: newAdmin.is_admin }]);
            setNewAdmin({ admin_login: '', password: '', is_admin: false });
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Управление администраторами
            </Typography>
            <List>
                {admins.map((admin) => (
                    <ListItem key={admin.id}>
                        {admin.admin_login} - {admin.is_admin ? "Администратор" : "Пользователь"}
                    </ListItem>
                ))}
            </List>

            <Typography variant="h5" gutterBottom>
                Добавить администратора
            </Typography>
            <TextField
                label="Логин"
                value={newAdmin.admin_login}
                onChange={(e) => setNewAdmin({ ...newAdmin, admin_login: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Пароль"
                type="password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={addAdmin} sx={{ mt: 2 }}>
                Добавить
            </Button>
        </Box>
    );
};

export default UserManagement;
