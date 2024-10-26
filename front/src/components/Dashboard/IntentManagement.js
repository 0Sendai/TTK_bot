// src/components/Dashboard/IntentManagement.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItem } from '@mui/material';

const IntentManagement = () => {
    const [intentions, setIntentions] = useState([]);
    const [newIntent, setNewIntent] = useState({ intention: '', keywords: '' });

    // Получение списка намерений
    useEffect(() => {
        fetch('http://185.105.109.24:5000/intentions')
            .then((response) => {
                    console.log(response);
                    return response.json();})
            .then((data) => {
                    console.log(data);
                    setIntentions(data);})
            .catch(error => console.error("Error fetching intentions:", error));
    }, []);

    // Добавление нового намерения
    const addIntent = async () => {
        const response = await fetch('http://185.105.109.24:5000/intentions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                intention: newIntent.intention,
                keywords: newIntent.keywords.split(',')
            })
        });

        const result = await response.json();
        if (result.success) {
            setIntentions([...intentions, { ...newIntent, keywords: newIntent.keywords.split(',') }]);
            setNewIntent({ intention: '', keywords: '' });
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Управление намерениями
            </Typography>
            <List>
                {intentions.map((intent) => (
                    <ListItem key={intent.id}>
                        {intent.intention} - ключевые слова: {intent.keywords.join(', ')}
                    </ListItem>
                ))}
            </List>

            <Typography variant="h5" gutterBottom>
                Добавить намерение
            </Typography>
            <TextField
                label="Намерение"
                value={newIntent.intention}
                onChange={(e) => setNewIntent({ ...newIntent, intention: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Ключевые слова"
                value={newIntent.keywords}
                onChange={(e) => setNewIntent({ ...newIntent, keywords: e.target.value })}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={addIntent} sx={{ mt: 2 }}>
                Добавить
            </Button>
        </Box>
    );
};

export default IntentManagement;