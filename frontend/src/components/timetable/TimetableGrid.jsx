import { useApp } from '../../context/AppContext';

export default function TimetableGrid() {
    const { timetable } = useApp();

    return (
        <div className="card">
            <h2 className="cardTitle">Timetable View</h2>
            {timetable.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                    <p style={{ fontSize: '18px', marginBottom: '10px' }}>No timetable generated yet.</p>
                    <p>Go to <strong>Manage Data</strong> to add courses, then click <strong>Generate New</strong>.</p>
                </div>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Section</th>
                            <th>Course</th>
                            <th>Faculty</th>
                            <th>Room</th>
                            <th>Day</th>
                            <th>Slot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timetable.map((t, i) => (
                            <tr key={i}>
                                <td>{t.section}</td>
                                <td>{t.course}</td>
                                <td>{t.faculty}</td>
                                <td>{t.room}</td>
                                <td>{t.day}</td>
                                <td>{t.slot}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
