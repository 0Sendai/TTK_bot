// src/components/Dashboard/IntentManagement.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const IntentManagement = () => {
    const [intents, setIntents] = useState([
        { id: 1, intent: 'Смена тарифа', keywords: ['тариф', 'смена'] }
    ]);
    const [newIntent, setNewIntent] = useState({ intent: '', keywords: '' });

    const addIntent = () => {
        setIntents([...intents, { ...newIntent, id: intents.length + 1 }]);
        setNewIntent({ intent: '', keywords: '' });
    };

    const deleteIntent = (id) => {
        setIntents(intents.filter((intent) => intent.id !== id));
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Управление намерениями
            </Typography>
            <List>
                {intents.map((intent) => (
                    <ListItem key={intent.id} secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteIntent(intent.id)}>
                            <DeleteIcon />
                        </IconButton>
                    }>
                        {intent.intent} - ключевые слова: {intent.keywords.join(', ')}
                    </ListItem>
                ))}
            </List>

            <Typography variant="h5" gutterBottom>
                Добавить намерение
            </Typography>
            <TextField
                label="Намерение"
                value={newIntent.intent}
                onChange={(e) => setNewIntent({ ...newIntent, intent: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Ключевые слова"
                value={newIntent.keywords}
                onChange={(e) => setNewIntent({ ...newIntent, keywords: e.target.value.split(',') })}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={addIntent}>
                Добавить
            </Button>
        </Box>
    );
};

export default IntentManagement;
