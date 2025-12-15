import React, { useState, useEffect } from 'react';
import api from '../api';

export default function UserModal({ user, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('user');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
      setRole(user.role);
    } else {
      setName('');
      setPhone('');
      setRole('user');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, phone, role };
    if (user) {
      await api.put(`/admin/users/${user._id}`, userData);
    } else {
      await api.post('/admin/users', userData);
    }
    onSave();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{user ? 'Edit User' : 'Create User'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}