import { mockStorage } from "@/utils/mockStorage";

const KEY = "timetables";

export const getTimetables = async () => {
    return mockStorage.getItems<any>(KEY);
};

export const generateTimetable = async () => {
    // This is a complex operation, mocking it simply for now
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Generate some mock entries
    const mockEntries = [
        { day: 'Monday', timeslot: { start: '09:00', end: '10:00' }, section: { name: 'CS-A' }, course: { name: 'Intro to CS', code: 'CS101' }, faculty: { name: 'Dr. Smith' }, room: { name: 'Room 101' } },
        { day: 'Monday', timeslot: { start: '10:00', end: '11:00' }, section: { name: 'CS-B' }, course: { name: 'Data Structures', code: 'CS102' }, faculty: { name: 'Prof. Jones' }, room: { name: 'Room 102' } },
    ];
    return mockStorage.createItem(KEY, { status: 'Generated', entries: mockEntries } as any);
};

export const detectConflicts = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { conflicts: [] }; // Mock no conflicts
};

export const resolveConflicts = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
};

export const clearTimetable = async () => {
    return mockStorage.clearItems(KEY);
};
