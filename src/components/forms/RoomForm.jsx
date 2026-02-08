import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function RoomForm() {
    const { addRoom } = useApp();
    const [room, setRoom] = useState({ name: '', capacity: 40, type: 'Theory' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!room.name) return;
        addRoom(room);
        setRoom({ name: '', capacity: 40, type: 'Theory' });
    };

    return (
        <div className="card">
            <h2 className="cardTitle">Add Room</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Room Name/Number</label>
                    <input
                        type="text"
                        value={room.name}
                        onChange={(e) => setRoom({ ...room, name: e.target.value })}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        placeholder="Room 101"
                    />
                </div>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Capacity</label>
                        <input
                            type="number"
                            value={room.capacity}
                            onChange={(e) => setRoom({ ...room, capacity: parseInt(e.target.value) })}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            min="1"
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Type</label>
                        <select
                            value={room.type}
                            onChange={(e) => setRoom({ ...room, type: e.target.value })}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="Theory">Theory</option>
                            <option value="Lab">Lab</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="primary">Add Room</button>
            </form>
        </div>
    );
}
