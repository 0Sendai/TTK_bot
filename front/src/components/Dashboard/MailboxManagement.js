// src/components/Dashboard/MailboxManagement.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItem } from '@mui/material';

const MailboxManagement = () => {
    const [mailboxes, setMailboxes] = useState([]);
    const [newEmail, setNewEmail] = useState('');

    // Получение списка почтовых адресов
    useEffect(() => {
        fetch('http://185.105.109.24:5000/mailboxes')
            .then((response) => {return response.json();})
            .then((data) => setMailboxes(data))
            .catch((error) => console.error('Ошибка при получении почтовых адресов:', error));
    }, []);

    // Добавление нового почтового адреса
    const addMailbox = async () => {
        const response = await fetch('http://185.105.109.24:5000/mailboxes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: newEmail })
        });

        const result = await response.json();
        if (result.success) {
            setMailboxes([...mailboxes, { email: newEmail }]);
            setNewEmail('');
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Управление почтовыми ящиками
            </Typography>
            <List>
                {mailboxes.map((mailbox, index) => (
                    <ListItem key={index}>{mailbox.email}</ListItem>
                ))}
            </List>

            <Typography variant="h5" gutterBottom>
                Добавить почтовый адрес
            </Typography>
            <TextField
                label="Почтовый адрес"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={addMailbox} sx={{ mt: 2 }}>
                Добавить
            </Button>
        </Box>
    );
};

export default MailboxManagement;
