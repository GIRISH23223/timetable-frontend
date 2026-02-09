import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function FacultyForm() {
    const { addFaculty, faculties, registeredUsers } = useApp();
    const [name, setName] = useState('');
    const [expertise, setExpertise] = useState('');

    // Filter users who are NOT yet faculty
    // Use optional chaining or default empty array to prevent crash if registeredUsers is slow to load
    const safeRegisteredUsers = registeredUsers || [];
    const availableUsers = safeRegisteredUsers.filter(u => !faculties.some(f => f.name === u.name));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !expertise) return;
        addFaculty({ name, expertise });
        setName('');
        setExpertise('');
    };

    return (
        <div className="card">
            <h2 className="cardTitle">Add Faculty</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Select Registered User</label>
                    {availableUsers.length === 0 ? (
                        <p style={{ color: '#f59e0b', fontSize: '0.9rem' }}>All registered users are already assigned!</p>
                    ) : (
                        <select
                            value={name}
                            onChange={e => setName(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '10px', background: 'rgba(255,255,255,0.1)', color: 'white' }}
                        >
                            <option value="">-- Select User --</option>
                            {availableUsers.map(u => (
                                <option key={u.id} value={u.name} style={{ color: 'black' }}>{u.name} ({u.email})</option>
                            ))}
                        </select>
                    )}
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Expertise</label>
                    <input
                        type="text"
                        value={expertise}
                        onChange={e => setExpertise(e.target.value)}
                        placeholder="e.g. AI/ML"
                    />
                </div>

                <button type="submit" className="primary" disabled={availableUsers.length === 0}>Add Faculty</button>
            </form>
        </div>
    );
}
