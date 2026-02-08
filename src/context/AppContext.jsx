import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [faculties, setFaculties] = useState([
        { id: 1, name: 'Dr. John Smith', expertise: 'Data Structures' },
        { id: 2, name: 'Prof. Alice Johnson', expertise: 'Database Systems' },
    ]);

    const [courses, setCourses] = useState([
        { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, facultyId: 1 },
        { id: 2, name: 'Database Systems', code: 'CS102', credits: 3, facultyId: 2 },
    ]);

    const [rooms, setRooms] = useState([
        { id: 1, name: 'Room 101', capacity: 60, type: 'Theory' },
        { id: 2, name: 'Lab 202', capacity: 30, type: 'Lab' },
    ]);

    const [timetable, setTimetable] = useState([]);
    const [constraints, setConstraints] = useState({
        maxClassesPerDay: 4,
        enforceRoomCapacity: true,
        separateLabTheory: true,
        avoidConsecutiveClasses: false,
    });

    const addFaculty = (faculty) => {
        setFaculties([...faculties, { ...faculty, id: Date.now() }]);
    };

    const addCourse = (course) => {
        setCourses([...courses, { ...course, id: Date.now() }]);
    };

    const addRoom = (room) => {
        setRooms([...rooms, { ...room, id: Date.now() }]);
    };

    const generateTimetable = () => {
        console.log("Generating timetable with", { faculties, courses, rooms, constraints });

        // Naive generation algorithm: Assign each course to a room and a slot
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const slots = ['09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '01:00 - 02:00', '02:00 - 03:00'];

        const newTimetable = courses.map((course, index) => {
            const faculty = faculties.find(f => f.id == course.facultyId) || { name: 'TBD' };
            const room = rooms[index % rooms.length] || { name: 'TBD' };
            const day = days[index % days.length];
            const slot = slots[Math.floor(index / days.length) % slots.length] || '09:00 - 10:00';

            return {
                section: "CS-A", // Default section for now
                course: course.name,
                faculty: faculty.name,
                room: room.name,
                day: day,
                slot: slot
            };
        });

        setTimetable(newTimetable);
    };

    return (
        <AppContext.Provider value={{
            faculties, addFaculty,
            courses, addCourse,
            rooms, addRoom,
            timetable, generateTimetable,
            constraints, setConstraints
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
