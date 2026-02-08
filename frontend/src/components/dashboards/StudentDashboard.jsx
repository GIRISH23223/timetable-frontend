import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export default function StudentDashboard({ onLogout }) {
    const { timetable, currentUser } = useApp();
    const [selectedSection, setSelectedSection] = useState(currentUser?.section || 'CSE-A');
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update time every minute
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    // Filter by selected section
    const myTimetable = timetable.filter(t => t.section === selectedSection);

    // Get unique faculty for this section
    const sectionFaculty = [...new Set(myTimetable.map(t => t.faculty))];

    // Helper to parse time string "08:50 - 09:40"
    const parseSlot = (slotString) => {
        try {
            const [startStr, endStr] = slotString.split(' - ');
            const parseTime = (str) => {
                const [time, period] = str.split(' '); // "08:50" (assuming 24h format in strings from generator? No, generator uses 08:50 - 09:40. Let's handle 24h standard)
                // Actually my generator uses "08:50 - 09:40" (24h-ish but might be mixed).
                // Let's assume HH:MM format from the generator logic "08:50 - 09:40"
                const [hours, minutes] = str.split(':').map(Number);
                const date = new Date();
                date.setHours(hours, minutes, 0, 0);
                return date;
            };
            return { start: parseTime(startStr), end: parseTime(endStr) };
        } catch (e) {
            return null;
        }
    };

    // Helper to find upcoming class
    const getUpcomingClass = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDayName = days[currentTime.getDay()];

        // Classes for today
        const todaysClasses = myTimetable.filter(t => t.day === currentDayName);

        // Sort by time
        todaysClasses.sort((a, b) => {
            const timeA = a.slot.split(' - ')[0]; // "08:50"
            const timeB = b.slot.split(' - ')[0];
            return timeA.localeCompare(timeB);
        });

        // Find current or next
        const now = new Date();

        for (let cls of todaysClasses) {
            const times = parseSlot(cls.slot);
            if (!times) continue;

            // If we are currently IN this class
            if (now >= times.start && now <= times.end) {
                return { ...cls, status: 'Ongoing 🟢' };
            }
            // If this class is in the future
            if (now < times.start) {
                return { ...cls, status: 'Upcoming 🚀' };
            }
        }

        return null;
    };

    const nextClass = getUpcomingClass();

    // Group items by Day for the Table
    const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const groupedTimetable = daysOrder.map(day => ({
        day,
        classes: myTimetable.filter(t => t.day === day).sort((a, b) => a.slot.localeCompare(b.slot))
    })).filter(g => g.classes.length > 0);

    return (
        <div className="page">
            <div className="header">
                <div>
                    🎓 Student Dashboard
                    <span style={{ fontSize: '0.8rem', marginLeft: '10px', opacity: 0.8 }}>
                        Welcome, {currentUser?.name || 'Student'}
                    </span>
                </div>
                <button onClick={onLogout} className="btn" style={{ fontSize: '0.9rem', padding: '6px 12px' }}>Logout</button>
            </div>

            <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>

                {/* Control Bar */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    flexWrap: 'wrap',
                    gap: '10px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label style={{ color: '#e2e8f0' }}>Viewing Timetable for:</label>
                        <select
                            value={selectedSection}
                            onChange={(e) => setSelectedSection(e.target.value)}
                            style={{
                                padding: '8px',
                                borderRadius: '6px',
                                background: 'rgba(255,255,255,0.1)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.2)'
                            }}
                        >
                            {['CSE-A', 'CSE-B', 'CSE-C', 'CSE-D', 'CSE-E', 'CSE-F', 'CSE-G', 'CSE-H'].map(sec => (
                                <option key={sec} value={sec}>{sec}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Widgets Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>

                    {/* Upcoming Class Widget */}
                    <div className="card" style={{ background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.7))' }}>
                        <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center' }}>
                            {nextClass ? nextClass.status : '📅 Schedule Status'}
                        </h3>
                        {nextClass ? (
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#818cf8', marginBottom: '5px' }}>
                                    {nextClass.course}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', color: '#cbd5e1' }}>
                                    <span>⏰ {nextClass.slot}</span>
                                    <span>👨‍🏫 {nextClass.faculty}</span>
                                    <span>📍 {nextClass.room}</span>
                                </div>
                            </div>
                        ) : (
                            <p style={{ color: '#94a3b8' }}>No more classes scheduled for today.</p>
                        )}
                    </div>

                    {/* Faculty List Widget */}
                    <div className="card">
                        <h3 style={{ marginTop: 0 }}>👨‍🏫 Your Faculty</h3>
                        {sectionFaculty.length > 0 ? (
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '150px', overflowY: 'auto' }}>
                                {sectionFaculty.map((f, idx) => (
                                    <li key={idx} style={{ padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p style={{ color: '#94a3b8' }}>No faculty assigned yet.</p>
                        )}
                    </div>
                </div>

                {/* Grouped Timetable */}
                <h2 className="cardTitle" style={{ marginBottom: '20px' }}>Weekly Schedule ({selectedSection})</h2>

                {groupedTimetable.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                        <h3>📭 No Timetable Published</h3>
                        <p>Please check back later.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {groupedTimetable.map(group => (
                            <div key={group.day} className="card">
                                <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginTop: 0, color: '#fcd34d' }}>
                                    {group.day}
                                </h3>
                                <div style={{ overflowX: 'auto' }}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '150px' }}>Time Slot</th>
                                                <th>Course</th>
                                                <th>Faculty</th>
                                                <th>Room</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {group.classes.map((t, i) => (
                                                <tr key={i}>
                                                    <td style={{ fontWeight: 'bold', color: '#e2e8f0' }}>{t.slot}</td>
                                                    <td style={{ color: '#818cf8', fontWeight: 'bold' }}>{t.course}</td>
                                                    <td>{t.faculty}</td>
                                                    <td>{t.room}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
