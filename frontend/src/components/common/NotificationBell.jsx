import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function NotificationBell() {
    const { notifications } = useApp();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ position: 'relative', display: 'inline-block', marginRight: '15px' }}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    position: 'relative'
                }}
            >
                🔔
                {notifications.length > 0 && (
                    <span style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        background: '#ef4444',
                        color: 'white',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(0,0,0,0.5)'
                    }}>
                        {notifications.length}
                    </span>
                )}
            </div>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    right: '0',
                    top: '40px',
                    width: '300px',
                    background: 'rgba(17, 24, 39, 0.95)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '10px',
                    zIndex: 1000,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                }}>
                    <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>
                        Notifications
                    </h4>
                    {notifications.length === 0 ? (
                        <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>No new notifications</p>
                    ) : (
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {notifications.map(n => (
                                <div key={n.id} style={{
                                    padding: '8px',
                                    marginBottom: '5px',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '6px',
                                    fontSize: '0.9rem'
                                }}>
                                    <div>{n.msg}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '2px', textAlign: 'right' }}>
                                        {n.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
