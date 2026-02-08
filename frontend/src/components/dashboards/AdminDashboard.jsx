import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import FacultyForm from '../forms/FacultyForm';
import CourseForm from '../forms/CourseForm';
import RoomForm from '../forms/RoomForm';
import NotificationBell from '../common/NotificationBell';


export default function AdminDashboard({ onLogout }) {
    const {
        generateTimetable,
        leaves,
        setLeaves,
        timetable,
        pendingUsers,
        approveUser,
        declineUser,
        faculties,
        courses,
        rooms,
        updateFaculty,
        deleteFaculty,
        deleteCourse,
        deleteRoom,
        constraints,
        setConstraints,
        resetData
    } = useApp();

    const [activeTab, setActiveTab] = useState("dashboard");
    const [selectedSection, setSelectedSection] = useState("CSE-A");

    // Filter timetable for Class View
    const classSchedule = timetable.filter(t => t.section === selectedSection);

    const handleApproveLeave = (id) => {
        setLeaves(leaves.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
    };

    return (
        <div className="page">
            <div className="header">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <NotificationBell />
                    🎓 Admin Dashboard
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={onLogout} className="btn" style={{ fontSize: '1rem', padding: '8px 16px' }}>Logout</button>
                </div>
            </div>

            <div className="card">
                <div className="btnRow">
                    <button className={activeTab === 'dashboard' ? 'primary' : 'btn'} onClick={() => setActiveTab('dashboard')}>
                        🏠 Overview
                    </button>
                    <button className={activeTab === 'forms' ? 'primary' : 'btn'} onClick={() => setActiveTab('forms')}>
                        📝 Manage Data
                    </button>
                    <button className={activeTab === 'approvals' ? 'primary' : 'btn'} onClick={() => setActiveTab('approvals')}>
                        🛡️ Approvals
                        {pendingUsers.length > 0 && <span style={{ marginLeft: '5px', background: 'red', borderRadius: '50%', padding: '0 6px', fontSize: '0.8rem' }}>!</span>}
                    </button>
                    <button className={activeTab === 'leaves' ? 'primary' : 'btn'} onClick={() => setActiveTab('leaves')}>
                        📅 Leave Requests {leaves.filter(l => l.status === 'Pending').length > 0 && <span style={{ background: 'red', color: 'white', padding: '2px 6px', borderRadius: '50%', fontSize: '12px' }}>{leaves.filter(l => l.status === 'Pending').length}</span>}
                    </button>
                    <button className={activeTab === 'timetable' ? 'primary' : 'btn'} onClick={() => setActiveTab('timetable')}>
                        📋 View Result
                    </button>
                    <button className="btn" onClick={() => {
                        window.print();
                    }}>
                        🖨️ Print / PDF
                    </button>
                    <button className="primary" onClick={() => {
                        generateTimetable();
                        setActiveTab('timetable');
                    }}>
                        🚀 Generate New
                    </button>
                </div>
            </div>

            {activeTab === 'approvals' && (
                <div className="card">
                    <h2 className="cardTitle">Pending User Approvals</h2>
                    {pendingUsers.length === 0 ? (
                        <p style={{ color: '#94a3b8' }}>No pending approvals.</p>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Requested Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingUsers.map(u => (
                                    <tr key={u.id}>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.role}</td>
                                        <td>
                                            <button onClick={() => approveUser(u.id)} className="primary" style={{ marginRight: '10px', padding: '5px 10px' }}>✅ Approve</button>
                                            <button onClick={() => declineUser(u.id)} className="btn" style={{ padding: '5px 10px', color: '#ef4444', borderColor: '#ef4444' }}>❌ Decline</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {activeTab === 'forms' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>

                    {/* Faculty Management */}
                    <div>
                        <FacultyForm />
                        <div className="card" style={{ marginTop: '20px' }}>
                            <h4>Existing Faculty</h4>
                            <ul style={{ listStyle: 'none', padding: 0, maxHeight: '200px', overflowY: 'auto' }}>
                                {faculties.map(f => (
                                    <li key={f.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #333' }}>
                                        <span>{f.name}</span>
                                        <div>
                                            <button onClick={() => {
                                                const newName = prompt("Edit Faculty Name:", f.name);
                                                if (newName) updateFaculty(f.id, { name: newName });
                                            }} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '5px' }}>✏️</button>
                                            <button onClick={() => deleteFaculty(f.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Course Management */}
                    <div>
                        <CourseForm />
                        <div className="card" style={{ marginTop: '20px' }}>
                            <h4>Existing Courses</h4>
                            <ul style={{ listStyle: 'none', padding: 0, maxHeight: '200px', overflowY: 'auto' }}>
                                {courses.map(c => (
                                    <li key={c.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #333' }}>
                                        <span>{c.name}</span>
                                        <button onClick={() => deleteCourse(c.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Registered Users Management */}
                    <div>
                        <div className="card">
                            <h3>👥 Registered Users</h3>
                            <ul style={{ listStyle: 'none', padding: 0, maxHeight: '200px', overflowY: 'auto' }}>
                                {useApp().registeredUsers.map(u => (
                                    <li key={u.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #333' }}>
                                        <div>
                                            <span style={{ fontWeight: 'bold', display: 'block' }}>{u.name}</span>
                                            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{u.email} ({u.role})</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span style={{ marginRight: '10px', fontSize: '0.8rem', color: '#10b981' }}>Approved</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Room Management */}
                    <div>
                        <RoomForm />
                        <div className="card" style={{ marginTop: '20px' }}>
                            <h4>Existing Rooms</h4>
                            <ul style={{ listStyle: 'none', padding: 0, maxHeight: '200px', overflowY: 'auto' }}>
                                {rooms.map(r => (
                                    <li key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #333' }}>
                                        <span>{r.name}</span>
                                        <button onClick={() => deleteRoom(r.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'timetable' && (
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h2 className="cardTitle" style={{ margin: 0 }}>Generated Timetable</h2>
                        <select
                            value={selectedSection}
                            onChange={(e) => setSelectedSection(e.target.value)}
                            style={{ width: '200px', margin: 0 }}
                        >
                            {['CSE-A', 'CSE-B', 'CSE-C', 'CSE-D', 'CSE-E', 'CSE-F', 'CSE-G', 'CSE-H'].map(sec => (
                                <option key={sec} value={sec}>{sec}</option>
                            ))}
                        </select>
                    </div>

                    {classSchedule.length === 0 ? <p>No timetable generated for {selectedSection} yet. Go to 'Overview' and click 'Generate New'.</p> : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Slot</th>
                                    <th>Course</th>
                                    <th>Faculty</th>
                                    <th>Room</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classSchedule.map((t, i) => (
                                    <tr key={i}>
                                        <td>{t.day}</td>
                                        <td>{t.slot}</td>
                                        <td>{t.course}</td>
                                        <td>{t.faculty}</td>
                                        <td>{t.room}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {activeTab === 'leaves' && (
                <div className="card">
                    <h2 className="cardTitle">Faculty Leave Requests</h2>
                    {leaves.length === 0 ? <p>No leave requests.</p> : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Faculty</th>
                                    <th>Date</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaves.map(leave => (
                                    <tr key={leave.id}>
                                        <td>{leave.facultyName}</td>
                                        <td>{leave.date}</td>
                                        <td>{leave.reason}</td>
                                        <td>
                                            <span className={`status ${leave.status === 'Approved' ? 'success' : leave.status === 'Pending' ? 'warning' : 'error'}`} style={{ display: 'inline-block', fontSize: '0.85rem' }}>
                                                {leave.status}
                                            </span>
                                        </td>
                                        <td>
                                            {leave.status === 'Pending' && (
                                                <button className="primary" style={{ padding: '5px 10px', fontSize: '0.8rem' }} onClick={() => handleApproveLeave(leave.id)}>Approve</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {activeTab === 'dashboard' && (
                <>
                    <div className="stat-grid">
                        <div className="stat-card">
                            <div className="stat-icon">👨‍🏫</div>
                            <div className="stat-info">
                                <h3>{faculties.length}</h3>
                                <p>Total Faculty</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">📚</div>
                            <div className="stat-info">
                                <h3>{courses.length}</h3>
                                <p>Total Courses</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🏫</div>
                            <div className="stat-info">
                                <h3>{rooms.length}</h3>
                                <p>Total Rooms</p>
                            </div>
                        </div>
                        <div className="stat-card" style={{ borderColor: leaves.some(l => l.status === 'Pending') ? '#ef4444' : '' }}>
                            <div className="stat-icon">{leaves.filter(l => l.status === 'Pending').length > 0 ? '🔔' : '✅'}</div>
                            <div className="stat-info">
                                <h3>{leaves.filter(l => l.status === 'Pending').length}</h3>
                                <p>Pending Leaves</p>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ marginTop: '20px' }}>
                        <h3 className="cardTitle">⚙️ Generation Rules</h3>
                        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
                                <input
                                    type="checkbox"
                                    checked={constraints.includeSaturday}
                                    onChange={e => setConstraints({ ...constraints, includeSaturday: e.target.checked })}
                                />
                                Include Saturday
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
                                <input
                                    type="checkbox"
                                    checked={constraints.avoidConsecutiveClasses}
                                    onChange={e => setConstraints({ ...constraints, avoidConsecutiveClasses: e.target.checked })}
                                />
                                Avoid Consecutive Classes
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
                                <input
                                    type="checkbox"
                                    checked={constraints.separateLabTheory}
                                    onChange={e => setConstraints({ ...constraints, separateLabTheory: e.target.checked })}
                                />
                                Separate Lab & Theory
                            </label>
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="cardTitle">Welcome, Admin</h2>
                        <p style={{ color: '#94a3b8' }}>
                            You have full control over the system. Use the navigation buttons above to manage data,
                            review leave requests, and generate the final schedule.
                        </p>
                        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '20px 0' }} />
                        <button className="btn" onClick={() => {
                            if (confirm("Are you sure? This will delete all data and reset to defaults.")) {
                                resetData();
                            }
                        }} style={{ color: '#ef4444', borderColor: '#ef4444' }}>
                            🔄 Factory Reset System
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
