import React from 'react';

export default function LandingPage({ onGetStarted }) {
    return (
        <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            <h1 style={{
                fontSize: '4.5rem',
                background: 'linear-gradient(to right, #a78bfa, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '20px',
                fontWeight: '900',
                letterSpacing: '-2px',
                filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))'
            }}>
                Timetable Scheduler ⚡
            </h1>
            <p style={{
                fontSize: '1.25rem',
                color: '#4b5563',
                marginBottom: '40px',
                lineHeight: '1.6'
            }}>
                Effortlessly manage faculties, courses, and rooms. <br />
                Generate conflict-free schedules in seconds with our intelligent algorithm.
            </p>

            <div className="card" style={{ marginBottom: '40px' }}>
                <h3 style={{ color: '#6366f1', marginBottom: '15px' }}>🚀 Key Features</h3>
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <span style={{ fontSize: '2rem' }}>👩‍🏫</span>
                        <p>Faculty Management</p>
                    </div>
                    <div>
                        <span style={{ fontSize: '2rem' }}>📚</span>
                        <p>Course Allocation</p>
                    </div>
                    <div>
                        <span style={{ fontSize: '2rem' }}>🗓️</span>
                        <p>Auto-Scheduling</p>
                    </div>
                </div>
            </div>

            <button
                className="primary"
                style={{ fontSize: '1.2rem', padding: '15px 40px' }}
                onClick={onGetStarted}
            >
                Get Started &rarr;
            </button>
        </div>
    );
}
