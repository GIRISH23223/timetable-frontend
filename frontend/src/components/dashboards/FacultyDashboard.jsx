import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import NotificationBell from '../common/NotificationBell';

export default function FacultyDashboard({ onLogout }) {
    const { timetable, currentUser, leaves, setLeaves } = useApp();
    const [activeTab, setActiveTab] = useState("schedule");
    const [leaveReason, setLeaveReason] = useState("");
    const [leaveDate, setLeaveDate] = useState("");

    // Filter timetable for this faculty (Mocking: showing all for now if no specific user)
    const mySchedule = currentUser ? timetable.filter(t => t.faculty === currentUser.name) : timetable;

    const [selectedSection, setSelectedSection] = useState("CSE-A");

    // Filter timetable for Class View
    const classSchedule = timetable.filter(t => t.section === selectedSection);

    const handleRequestLeave = (e) => {
        e.preventDefault();
        if (!leaveDate || !leaveReason) return;

        const newLeave = {
            id: Date.now(),
            facultyName: currentUser ? currentUser.name : 'Faculty User',
            date: leaveDate,
            reason: leaveReason,
            status: 'Pending'
        };

        setLeaves([...leaves, newLeave]);
        setLeaveDate("");
        setLeaveReason("");
        alert("Leave request submitted!");
    };

    return (
        <div className="page">
            <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <NotificationBell />
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>👨‍🏫 Faculty Dashboard</span>
                </div>
                <button
                    onClick={onLogout}
                    className="btn"
                    style={{
                        fontSize: '1rem',
                        padding: '8px 20px',
                        border: '1px solid #ef4444',
                        color: '#ef4444',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }}
                >
                    🚪 Logout
                </button>
            </div>

            <div className="card">
                <div className="btnRow" style={{ justifyContent: 'flex-start' }}>
                    <button className={activeTab === 'schedule' ? 'primary' : 'btn'} onClick={() => setActiveTab('schedule')}>
                        📅 My Schedule
                    </button>
                    <button className={activeTab === 'leaves' ? 'primary' : 'btn'} onClick={() => setActiveTab('leaves')}>
                        💊 Request Leave
                    </button>
                </div>
            </div>

            {activeTab === 'schedule' && (
                <div className="card">
                    <h2 className="cardTitle">My Classes</h2>
                    {mySchedule.length === 0 ? <p>No classes scheduled yet.</p> : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Room</th>
                                    <th>Day</th>
                                    <th>Slot</th>
                                    <th>Section</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mySchedule.map((t, i) => (
                                    <tr key={i}>
                                        <td>{t.course}</td>
                                        <td>{t.room}</td>
                                        <td>{t.day}</td>
                                        <td>{t.slot}</td>
                                        <td>{t.section}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {activeTab === 'leaves' && (
                <div className="card" style={{ maxWidth: '600px' }}>
                    <h2 className="cardTitle">Submit Leave Request</h2>
                    <form onSubmit={handleRequestLeave}>
                        <div style={{ marginBottom: '15px' }}>
                            <label>Day of Leave</label>
                            <select value={leaveDate} onChange={e => setLeaveDate(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                                <option value="">Select Day...</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label>Reason</label>
                            <textarea
                                value={leaveReason}
                                onChange={e => setLeaveReason(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                                rows="3"
                            ></textarea>
                        </div>
                        <button className="primary">Submit Request</button>
                    </form>
                </div>
            )}
        </div>
    );
}
