import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function LoginPage({ onLogin, onNavigate }) {
    const [selectedRole, setSelectedRole] = useState(null); // 'admin', 'faculty', 'student'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Mock validation based on selected role
        if (selectedRole === 'admin') {
            if (username === 'admin' && password === 'admin') {
                onLogin('admin', { name: 'Admin User' });
            } else {
                setError('Invalid Admin credentials. Try admin/admin');
            }
        } else if (selectedRole === 'faculty') {
            if (username === 'faculty' && password === 'faculty') {
                onLogin('faculty', { name: 'Dr. John Smith' });
            } else {
                setError('Invalid Faculty credentials. Try faculty/faculty');
            }
        } else if (selectedRole === 'student') {
            if (username === 'student' && password === 'student') {
                onLogin('student', { name: 'Student 1', section: 'CS-A' });
            } else {
                setError('Invalid Student credentials. Try student/student');
            }
        }
    };

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setError('');
        setUsername('');
        setPassword('');
    };

    // --- Role Selection View ---
    if (!selectedRole) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh',
                flexDirection: 'column'
            }}>
                <h2 style={{
                    marginBottom: '40px',
                    fontSize: '2rem',
                    color: '#4f46e5',
                    fontWeight: '700'
                }}>Unknown User? Identify Yourself.</h2>

                <div style={{
                    display: 'flex',
                    gap: '30px',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    maxWidth: '1000px'
                }}>
                    <RoleCard
                        title="Admin"
                        emoji="⚡"
                        desc="Manage System & Generate Timetables"
                        onClick={() => handleRoleSelect('admin')}
                    />
                    <RoleCard
                        title="Faculty"
                        emoji="👨‍🏫"
                        desc="View Schedule & Request Leaves"
                        onClick={() => handleRoleSelect('faculty')}
                    />
                    <RoleCard
                        title="Student"
                        emoji="🎓"
                        desc="Check Class & Exam Schedules"
                        onClick={() => handleRoleSelect('student')}
                    />
                </div>
            </div>
        );
    }

    // --- Login Form View ---
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center', position: 'relative' }}>
                <button
                    onClick={() => setSelectedRole(null)}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        padding: '0',
                        color: '#6b7280'
                    }}
                >
                    ← Back
                </button>

                <h2 className="cardTitle">
                    {selectedRole === 'admin' && '⚡ Admin Login'}
                    {selectedRole === 'faculty' && '👨‍🏫 Faculty Login'}
                    {selectedRole === 'student' && '🎓 Student Login'}
                </h2>
                <p style={{ color: '#6b7280', marginBottom: '20px' }}>Enter your credentials to access the portal.</p>

                {error && <div className="status error" style={{ marginBottom: '20px' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={`Enter ${selectedRole} ID`}
                        />
                    </div>
                    <div style={{ marginBottom: '30px', textAlign: 'left' }}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>
                    <button type="submit" className="primary" style={{ width: '100%' }}>
                        Login as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                    </button>

                    <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#94a3b8' }}>
                        New User? <span onClick={() => onNavigate('register')} style={{ color: '#8b5cf6', cursor: 'pointer', textDecoration: 'underline' }}>Register Here</span>
                    </p>
                </form>
                <p style={{ marginTop: '15px', fontSize: '0.85rem', color: '#9ca3af' }}>
                    Hint: Use <strong>{selectedRole}</strong> / <strong>{selectedRole}</strong>
                </p>
            </div>
        </div>
    );
}

function RoleCard({ title, emoji, desc, onClick }) {
    return (
        <div
            className="card"
            onClick={onClick}
            style={{
                width: '280px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                border: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.borderColor = '#6366f1';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'transparent';
            }}
        >
            <div style={{ fontSize: '4rem', marginBottom: '10px' }}>{emoji}</div>
            <h3 style={{ margin: '10px 0', color: '#ffffff' }}>{title}</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{desc}</p>
        </div>
    );
}
