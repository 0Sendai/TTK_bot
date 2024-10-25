// src/components/Dashboard/UserManagement.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const UserManagement = () => {
    const [users, setUsers] = useState([
        { id: 1, username: 'admin', role: 'admin' },
        { id: 2, username: 'editor', role: 'editor' }
    ]);
    const [newUser, setNewUser] = useState({ username: '', role: 'editor' });

    const addUser = () => {
        setUsers([...users, { ...newUser, id: users.length + 1 }]);
        setNewUser({ username: '', role: 'editor' });
    };

    const deleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Управление пользователями
            </Typography>
            <List>
                {users.map((user) => (
                    <ListItem key={user.id} secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteUser(user.id)}>
                            <DeleteIcon />
                        </IconButton>
                    }>
                        {user.username} - {user.role}
                    </ListItem>
                ))}
            </List>

            <Typography variant="h5" gutterBottom>
                Добавить пользователя
            </Typography>
            <TextField
                label="Имя пользователя"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Роль"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={addUser}>
                Добавить
            </Button>
        </Box>
    );
};

export default UserManagement;
