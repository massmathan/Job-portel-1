import React, { useState } from 'react';

const SettingsManager = () => {
  const [theme, setTheme] = useState('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [role, setRole] = useState('admin');

  const handleSave = () => {
    const settings = {
      theme,
      notificationsEnabled,
      role,
    };
    console.log('Settings saved:', settings);
    alert('Settings have been saved!');
  };

  return (
     <div className="container py-5 d-flex justify-content-center">
      <div className="col-md-6 col-lg-5 p-4 border rounded shadow-sm bg-light">
    <div style={{ padding: '2rem' }}>
      <h2>System Settings</h2>

      <div className="mb-3">
        <label>Theme:</label>
        <select className="form-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          checked={notificationsEnabled}
          onChange={(e) => setNotificationsEnabled(e.target.checked)}
        />
        <label className="form-check-label">Enable Notifications</label>
      </div>

      <div className="mb-3">
        <label>User Role:</label>
        <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="recruiter">Recruiter</option>
          <option value="user">User</option>
        </select>
      </div>

      <button className="btn btn-primary" onClick={handleSave}>Save Settings</button>
    </div>
    </div>
    </div>
  );
};

export default SettingsManager;
