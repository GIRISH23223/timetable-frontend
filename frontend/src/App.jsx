import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import FacultyDashboard from "./components/dashboards/FacultyDashboard";
import StudentDashboard from "./components/dashboards/StudentDashboard";
import "./styles.css";

function MainContent() {
    const [view, setView] = useState('landing');
    const { userRole, setUserRole, setCurrentUser } = useApp();

    const handleLogin = (role, user) => {
        setUserRole(role);
        setCurrentUser(user);
        setView('dashboard');
    };

    const handleLogout = () => {
        setUserRole(null);
        setCurrentUser(null);
        setView('login');
    };

    return (
        <>
            {view === 'landing' && <LandingPage onGetStarted={() => setView('login')} />}

            {view === 'login' && <LoginPage onLogin={handleLogin} onNavigate={setView} />}
            {view === 'register' && <RegisterPage onNavigate={setView} />}

            {view === 'dashboard' && (
                <>
                    {userRole === 'admin' && <AdminDashboard onLogout={handleLogout} />}
                    {userRole === 'faculty' && <FacultyDashboard onLogout={handleLogout} />}
                    {userRole === 'student' && <StudentDashboard onLogout={handleLogout} />}
                </>
            )}
        </>
    );
}

export default function App() {
    return (
        <AppProvider>
            <MainContent />
        </AppProvider>
    );
}
