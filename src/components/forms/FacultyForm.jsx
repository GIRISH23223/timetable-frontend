import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function FacultyForm() {
    const { addFaculty } = useApp();
    const [name, setName] = useState('');
    const [expertise, setExpertise] = useState('');

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
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        placeholder="Dr. John Doe"
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Expertise</label>
                    <input
                        type="text"
                        value={expertise}
                        onChange={(e) => setExpertise(e.target.value)}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        placeholder="Data Structures"
                    />
                </div>
                <button type="submit" className="primary">Add Faculty</button>
            </form>
        </div>
    );
}
