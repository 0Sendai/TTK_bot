// src/components/Dashboard/RoleManagement.js
import React, { useState } from 'react';

const RoleManagement = () => {
    const [selectedUser, setSelectedUser] = useState('');
    const [newRole, setNewRole] = useState('editor');

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
    };

    const handleRoleChange = (e) => {
        setNewRole(e.target.value);
    };

    const handleSubmit = () => {
        updateUserRole(selectedUser, newRole);
        setSelectedUser('');
    };

    return (
        <div>
            <h2>Управление ролями пользователей</h2>

            <div>
                <label>Выберите пользователя:</label>
                <select value={selectedUser} onChange={handleUserChange}>
                    <option value="">-- Выберите пользователя --</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.username} ({user.role})
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Выберите новую роль:</label>
                <select value={newRole} onChange={handleRoleChange}>
                    <option value="admin">Администратор</option>
                    <option value="editor">Редактор</option>
                </select>
            </div>

            <button onClick={handleSubmit}>Обновить роль</button>
        </div>
    );
};

export default RoleManagement;
