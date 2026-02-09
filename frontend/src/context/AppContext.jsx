import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [faculties, setFaculties] = useState([
        { id: 1, name: 'Dr. John Smith', expertise: 'Data Structures' },
        { id: 2, name: 'Prof. Alice Johnson', expertise: 'Database Systems' },
        { id: 3, name: 'Dr. Robert Brown', expertise: 'Networks' },
        { id: 4, name: 'Prof. Emily White', expertise: 'Operating Systems' },
        { id: 5, name: 'Dr. Alan Turing', expertise: 'Artificial Intelligence' },
    ]);

    const [courses, setCourses] = useState([
        { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, facultyId: 1 },
        { id: 2, name: 'Database Systems', code: 'CS102', credits: 4, facultyId: 2 },
        { id: 3, name: 'Computer Networks', code: 'CS103', credits: 3, facultyId: 3 },
        { id: 4, name: 'Operating Systems', code: 'CS104', credits: 4, facultyId: 4 },
        { id: 5, name: 'Artificial Intelligence', code: 'CS105', credits: 3, facultyId: 5 },
        { id: 6, name: 'Software Engineering', code: 'CS106', credits: 3, facultyId: 2 },
    ]);

    const [rooms, setRooms] = useState([
        { id: 1, name: 'Room 101', capacity: 60, type: 'Theory' },
        { id: 2, name: 'Lab 202', capacity: 30, type: 'Lab' },
        { id: 3, name: 'Room 103', capacity: 60, type: 'Theory' },
        { id: 4, name: 'Building B - Hall 1', capacity: 120, type: 'Theory' },
    ]);

    const [timetable, setTimetable] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [leaves, setLeaves] = useState([
        { id: 1, facultyName: 'Dr. John Smith', date: 'Friday', reason: 'Personal', status: 'Pending' }
    ]);
    const [notifications, setNotifications] = useState([]);

    // Mock "Database" of users who have signed up
    const [registeredUsers, setRegisteredUsers] = useState([
        { id: 101, name: 'Robert Langdon', email: 'robert@harvard.edu', password: 'password', role: 'Faculty', approved: true },
        { id: 102, name: 'Indiana Jones', email: 'indy@college.edu', password: 'password', role: 'Faculty', approved: true },
        { id: 103, name: 'Harry Potter', email: 'harry@hogwarts.edu', password: 'password', role: 'Student', approved: true, section: 'CSE-A' },
        { id: 104, name: 'Hermione Granger', email: 'hermione@hogwarts.edu', password: 'password', role: 'Student', approved: true, section: 'CSE-B' },
    ]);
    const [pendingUsers, setPendingUsers] = useState([]);

    const registerUser = (user) => {
        // Simple check if user already exists
        if (registeredUsers.some(u => u.email === user.email) || pendingUsers.some(u => u.email === user.email)) {
            alert("User with this email already exists!");
            return;
        }
        setPendingUsers([...pendingUsers, { ...user, id: Date.now(), approved: false }]);
        addNotification("New User Registration Pending Approval! 🛡️");
    };

    const approveUser = (id) => {
        const user = pendingUsers.find(u => u.id === id);
        if (user) {
            setRegisteredUsers([...registeredUsers, { ...user, approved: true }]);
            setPendingUsers(pendingUsers.filter(u => u.id !== id));
            addNotification(`User ${user.name} Approved! ✅`);
        }
    };

    const declineUser = (id) => {
        const user = pendingUsers.find(u => u.id === id);
        if (user) {
            setPendingUsers(pendingUsers.filter(u => u.id !== id));
            addNotification(`User ${user.name} Declined and Removed. ❌`);
        }
    };

    const addNotification = (msg) => {
        const newNotif = { id: Date.now(), msg, time: new Date().toLocaleTimeString() };
        setNotifications(prev => [newNotif, ...prev]);
        // Auto-remove after 5 seconds
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== newNotif.id));
        }, 5000);
    };

    const deleteFaculty = (id) => setFaculties(prev => prev.filter(f => f.id !== id));
    const deleteCourse = (id) => setCourses(prev => prev.filter(c => c.id !== id));
    const deleteRoom = (id) => setRooms(prev => prev.filter(r => r.id !== id));

    const updateFaculty = (id, data) => setFaculties(prev => prev.map(f => f.id === id ? { ...f, ...data } : f));
    const updateCourse = (id, data) => setCourses(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    const updateRoom = (id, data) => setRooms(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));

    const clearDatabase = (type) => {
        if (type === 'faculty') setFaculties([]);
        if (type === 'courses') setCourses([]);
        if (type === 'rooms') setRooms([]);
        addNotification(`All ${type} cleared.`);
    };

    const [constraints, setConstraints] = useState({
        maxClassesPerDay: 4,
        enforceRoomCapacity: true,
        separateLabTheory: true,
        avoidConsecutiveClasses: false,
        includeSaturday: false
    });

    const addFaculty = (faculty) => {
        setFaculties([...faculties, { ...faculty, id: Date.now() }]);
        addNotification(`New Faculty Added: ${faculty.name}`);
    };

    const addCourse = (course) => {
        setCourses([...courses, { ...course, id: Date.now() }]);
        addNotification(`New Course Added: ${course.name}`);
    };

    const addRoom = (room) => {
        setRooms([...rooms, { ...room, id: Date.now() }]);
        addNotification(`New Room Added: ${room.name}`);
    };

    const generateTimetable = () => {
        addNotification("Started Timetable Generation...");
        const sections = ['CSE-A', 'CSE-B', 'CSE-C', 'CSE-D', 'CSE-E', 'CSE-F', 'CSE-G', 'CSE-H'];
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        if (constraints.includeSaturday) days.push('Saturday');

        // CUSTOM SLOTS based on User Request
        // 08:50 start, Breaks at 10:35-10:45 & 01:15-02:00, End 04:35
        const slots = [
            '08:50 - 09:40', // 1
            '09:40 - 10:30', // 2
            '10:45 - 11:35', // 3 (After 10 min break)
            '11:35 - 12:25', // 4
            '12:25 - 01:15', // 5
            '02:00 - 02:50', // 6 (After Lunch)
            '02:50 - 03:40', // 7
            '03:40 - 04:35'  // 8
        ];

        let newTimetable = [];

        // Helper to check conflicts
        const isConflict = (facultyName, roomName, day, slot, section) => {
            return newTimetable.some(t =>
                t.day === day &&
                t.slot === slot &&
                (t.faculty === facultyName || t.room === roomName || t.section === section)
            );
        };

        sections.forEach((section, secIdx) => {
            courses.forEach((course, courseIdx) => {
                const faculty = faculties.find(f => f.id == course.facultyId) || { name: 'TBD' };
                const creditHours = parseInt(course.credits) || 3;

                // We need to schedule this course 'creditHours' times
                let scheduledCount = 0;

                // Try to distribute across days first
                for (let d = 0; d < days.length; d++) {
                    if (scheduledCount >= creditHours) break;

                    const dayIndex = (courseIdx + d + secIdx) % days.length;
                    const currentDay = days[dayIndex];

                    // Simple "1 class per day per course" heuristic to spread them out
                    // Only try slots for this day
                    for (let s = 0; s < slots.length; s++) {
                        // Spread slots
                        const slotIndex = (courseIdx + s + secIdx) % slots.length;
                        const currentSlot = slots[slotIndex];

                        const room = rooms[(courseIdx + secIdx + s) % rooms.length] || { name: 'Virtual Class' };
                        const onLeave = leaves.some(l => l.facultyName === faculty.name && l.status === 'Approved' && l.date === currentDay);

                        if (!onLeave && !isConflict(faculty.name, room.name, currentDay, currentSlot, section)) {
                            newTimetable.push({
                                section: section,
                                course: course.name,
                                faculty: faculty.name,
                                room: room.name,
                                day: currentDay,
                                slot: currentSlot
                            });
                            scheduledCount++;
                            break; // One class of this course per day max (unless we run out of days, but simple for now)
                        }
                    }
                }
            });
        });

        setTimetable(newTimetable);
        addNotification(`Generated ${newTimetable.length} classes for ${sections.length} sections! 🚀`);
    };

    // Load from LocalStorage on mount
    useEffect(() => {
        const savedFaculties = localStorage.getItem('faculties');
        const savedCourses = localStorage.getItem('courses');
        const savedRooms = localStorage.getItem('rooms');
        const savedTimetable = localStorage.getItem('timetable');
        const savedLeaves = localStorage.getItem('leaves');

        const savedRegistered = localStorage.getItem('registeredUsers');
        const savedPending = localStorage.getItem('pendingUsers');

        if (savedFaculties) setFaculties(JSON.parse(savedFaculties));
        if (savedCourses) setCourses(JSON.parse(savedCourses));
        if (savedRooms) setRooms(JSON.parse(savedRooms));
        if (savedTimetable) setTimetable(JSON.parse(savedTimetable));
        if (savedLeaves) setLeaves(JSON.parse(savedLeaves));

        if (savedRegistered) {
            let users = JSON.parse(savedRegistered);
            // MIGRATION: Fix CS- to CSE-
            const fixedUsers = users.map(u => ({
                ...u,
                section: u.section?.replace(/^CS-/, 'CSE-') || u.section
            }));
            setRegisteredUsers(fixedUsers);
        }
        if (savedTimetable) {
            let ttb = JSON.parse(savedTimetable);
            // MIGRATION: Fix CS- to CSE- in Timetable
            const fixedTtb = ttb.map(t => ({
                ...t,
                section: t.section?.replace(/^CS-/, 'CSE-') || t.section
            }));
            setTimetable(fixedTtb);
        }
        if (savedPending) setPendingUsers(JSON.parse(savedPending));
    }, []);

    // Save to LocalStorage on change
    useEffect(() => { localStorage.setItem('faculties', JSON.stringify(faculties)); }, [faculties]);
    useEffect(() => { localStorage.setItem('courses', JSON.stringify(courses)); }, [courses]);
    useEffect(() => { localStorage.setItem('rooms', JSON.stringify(rooms)); }, [rooms]);
    useEffect(() => { localStorage.setItem('timetable', JSON.stringify(timetable)); }, [timetable]);
    useEffect(() => { localStorage.setItem('leaves', JSON.stringify(leaves)); }, [leaves]);

    useEffect(() => { localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers)); }, [registeredUsers]);
    useEffect(() => { localStorage.setItem('pendingUsers', JSON.stringify(pendingUsers)); }, [pendingUsers]);


    const resetData = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <AppContext.Provider value={{
            faculties, addFaculty,
            courses, addCourse,
            rooms, addRoom,
            timetable, generateTimetable,
            constraints, setConstraints,
            userRole, setUserRole,
            currentUser, setCurrentUser,
            leaves, setLeaves,
            notifications, addNotification,
            deleteFaculty, deleteCourse, deleteRoom,
            updateFaculty, updateCourse, updateRoom,
            clearDatabase,
            registeredUsers,
            pendingUsers, registerUser, approveUser, declineUser,
            resetData
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
