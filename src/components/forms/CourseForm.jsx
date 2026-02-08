import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function CourseForm() {
    const { addCourse, faculties } = useApp();
    const [course, setCourse] = useState({ name: '', code: '', credits: 3, facultyId: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!course.name || !course.code || !course.facultyId) return;
        addCourse(course);
        setCourse({ name: '', code: '', credits: 3, facultyId: '' });
    };

    return (
        <div className="card">
            <h2 className="cardTitle">Add Course</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Course Name</label>
                    <input
                        type="text"
                        value={course.name}
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        placeholder="Introduction to CS"
                    />
                </div>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Code</label>
                        <input
                            type="text"
                            value={course.code}
                            onChange={(e) => setCourse({ ...course, code: e.target.value })}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            placeholder="CS101"
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Credits</label>
                        <input
                            type="number"
                            value={course.credits}
                            onChange={(e) => setCourse({ ...course, credits: parseInt(e.target.value) })}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            min="1"
                            max="10"
                        />
                    </div>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Assigned Faculty</label>
                    <select
                        value={course.facultyId}
                        onChange={(e) => setCourse({ ...course, facultyId: e.target.value })}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="">Select Faculty</option>
                        {faculties.map(f => (
                            <option key={f.id} value={f.id}>{f.name} ({f.expertise})</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="primary">Add Course</button>
            </form>
        </div>
    );
}
