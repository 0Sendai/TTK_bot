// src/components/Dashboard/UserManagement.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItem } from '@mui/material';
import CryptoJS from 'crypto-js';

const UserManagement = () => {
    const [admins, setAdmins] = useState([]);
    const [newAdmin, setNewAdmin] = useState({ admin_login: '', password: '', is_admin: false });

    // Получение списка администраторов
    useEffect(() => {
        fetch('http://185.105.109.24:5000/admins')
            .then((response) => {return response.json();})
            .then(data => {
                console.log(data);
                setAdmins(data)})
            .catch(error => console.error("Error fetching admins:", error));
    }, []);

    // Добавление нового администратора
    const addAdmin = async () => {
        const hashedPassword = CryptoJS.SHA256(newAdmin.password).toString();

        const adminData = {
            ...newAdmin,
            password: hashedPassword
        };

        const response = await fetch('http://185.105.109.24:5000/admins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adminData)
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
