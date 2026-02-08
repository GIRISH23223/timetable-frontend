import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function RegisterPage({ onNavigate }) {
    const { registerUser } = useApp();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Student' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) return;

        registerUser(formData);
        alert("Registration Successful! Please wait for Admin approval to log in.");
        onNavigate('login');
    };

    return (
        <div className="page" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '40px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2rem' }}>📝 Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Full Name</label>
                        <input
                            type="text"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Email Address</label>
                        <input
                            type="email"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Password</label>
                        <input
                            type="password"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '25px' }}>
                        <label>Requested Role</label>
                        <select
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                            value={formData.role}
                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="Student">Student</option>
                            <option value="Faculty">Faculty</option>
                        </select>
                    </div>
                    <button className="primary" style={{ width: '100%', padding: '12px', fontSize: '1.1rem' }}>Register</button>

                    <p style={{ textAlign: 'center', marginTop: '20px', color: '#94a3b8' }}>
                        Already have an account? <span onClick={() => onNavigate('login')} style={{ color: '#8b5cf6', cursor: 'pointer', textDecoration: 'underline' }}>Login here</span>
                    </p>
                </form>
            </div>
        </div>
    );
}
