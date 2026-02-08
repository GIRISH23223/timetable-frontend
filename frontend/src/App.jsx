import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import FacultyForm from "./components/forms/FacultyForm";
import CourseForm from "./components/forms/CourseForm";
import RoomForm from "./components/forms/RoomForm";
import TimetableGrid from "./components/timetable/TimetableGrid";
import "./styles.css";

function AppContent() {
    const { generateTimetable } = useApp();
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <div className="page">
            <div className="header">
                🎓 Timetable Scheduler
            </div>

            <div className="card">
                <div className="btnRow">
                    <button className={activeTab === 'dashboard' ? 'primary' : 'btn'} onClick={() => setActiveTab('dashboard')}>
                        Dashboard
                    </button>
                    <button className={activeTab === 'forms' ? 'primary' : 'btn'} onClick={() => setActiveTab('forms')}>
                        Manage Data
                    </button>
                    <button className={activeTab === 'timetable' ? 'primary' : 'btn'} onClick={() => setActiveTab('timetable')}>
                        📋 View Result
                    </button>
                    <button className="primary" onClick={() => {
                        generateTimetable();
                        setActiveTab('timetable');
                    }}>
                        🚀 Generate New
                    </button>
                </div>
            </div>

            {activeTab === 'forms' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    <FacultyForm />
                    <CourseForm />
                    <RoomForm />
                </div>
            )}

            {activeTab === 'timetable' && (
                <TimetableGrid />
            )}

            {activeTab === 'dashboard' && (
                <div className="card">
                    <h2 className="cardTitle">Welcome</h2>
                    <p>Select "Manage Data" to add Faculties, Courses, and Rooms.</p>
                    <p>Select "View Timetable" to see the generated schedule.</p>
                    <p>Click "Generate New" to run the scheduling algorithm.</p>
                </div>
            )}
        </div>
    );
}

export default function App() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
}
