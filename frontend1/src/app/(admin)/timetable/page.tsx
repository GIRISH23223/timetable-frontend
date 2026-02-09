'use strict';
'use client';

import React, { useEffect, useState } from 'react';
import {
    getTimetables,
    generateTimetable,
    clearTimetable,
    detectConflicts,
    resolveConflicts,
} from '@/services/timetableService';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Badge from '@/components/ui/badge/Badge';

interface TimetableEntry {
    _id: string;
    day: string;
    timeslot: {
        startTime: string;
        endTime: string;
        slotNumber: number;
        day: string;
    };
    section: {
        name: string;
    };
    course: {
        name: string;
        code: string;
    };
    faculty: {
        name: string;
    };
    room: {
        name: string;
    };
}

export default function TimetablePage() {
    const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchTimetable();
    }, []);

    const fetchTimetable = async () => {
        try {
            const data = await getTimetables();
            // Sort by Day (Mon-Sun), then Slot Number, then Section
            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            const sortedData = data.sort((a: any, b: any) => {
                const dayOrder = days.indexOf(a.day) - days.indexOf(b.day);
                if (dayOrder !== 0) return dayOrder;

                // Handle potentially missing timeslot object or properties safley
                const slotA = a.timeslot?.slotNumber || 0;
                const slotB = b.timeslot?.slotNumber || 0;

                if (slotA !== slotB) return slotA - slotB;

                return a.section.name.localeCompare(b.section.name);
            });
            setTimetable(sortedData);
        } catch (error) {
            console.error('Failed to fetch timetable:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async () => {
        setLoading(true);
        try {
            await generateTimetable();
            const data: any = await getTimetables();
            // Since mock returns a collection, getting the last item as the "generated" one
            const latest = data[data.length - 1];
            if (latest && latest.entries) {
                setTimetable(latest.entries);
                alert('Timetable generated successfully!');
            } else {
                // If the mock structure is different or no entries, fallback to refetching all
                fetchTimetable();
                alert('Timetable generated successfully!');
            }
        } catch (error: any) {
            console.error('Failed to generate timetable:', error);
            alert(error.response?.data?.message || 'Failed to generate timetable.');
        } finally {
            setLoading(false);
        }
    };

    const handleClear = async () => {
        if (!confirm('Are you sure you want to clear the timetable?')) return;

        try {
            await clearTimetable();
            setTimetable([]);
            alert('Timetable cleared successfully');
        } catch (error: any) {
            console.error('Failed to clear timetable:', error);
            alert('Failed to clear timetable');
        }
    };

    const handleResolveConflicts = async () => {
        setLoading(true);
        setMessage(null);
        try {
            const result = await resolveConflicts();
            setMessage({ type: 'success', text: 'Conflicts resolved automatically!' });
            fetchTimetable();
        } catch (error: any) {
            console.error('Resolution failed:', error);
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to resolve conflicts.' });
        } finally {
            setLoading(false);
        }
    };

    const handleDetectConflicts = async () => {
        try {
            const result: any = await detectConflicts();
            if (result.conflicts && result.conflicts.length > 0) {
                alert(`Found ${result.conflicts.length} conflicts!`);
            } else {
                alert('No conflicts detected.');
            }
        } catch (error: any) {
            console.error('Conflict detection failed:', error);
            alert('Failed to detect conflicts.');
        }
    }

    return (
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Timetable Scheduler
                </h1>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? 'Processing...' : '🚀 Generate Timetable'}
                    </button>
                    <button
                        onClick={handleResolveConflicts}
                        disabled={loading}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                    >
                        ✨ Resolve Conflicts
                    </button>
                    <button
                        onClick={handleDetectConflicts}
                        disabled={loading}
                        className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                    >
                        🔍 Detect Conflicts
                    </button>
                    <button
                        onClick={handleClear}
                        disabled={loading}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                    >
                        🗑️ Clear
                    </button>
                </div>
            </div>

            {message && (
                <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    message.type === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                    {message.text}
                </div>
            )}

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-gray-50 dark:bg-gray-800">
                        <TableRow>
                            <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</TableCell>
                            <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</TableCell>
                            <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</TableCell>
                            <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</TableCell>
                            <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</TableCell>
                            <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {timetable.length > 0 ? (
                            timetable.map((entry, index) => (
                                <TableRow key={index}>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-medium">
                                        {entry.day}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {entry.timeslot?.startTime || 'N/A'} - {entry.timeslot?.endTime || 'N/A'}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">
                                        {entry.section?.name}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        <div>{entry.course?.name}</div>
                                        <div className="text-xs text-gray-400">{entry.course?.code}</div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {entry.faculty?.name}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {entry.room?.name}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell className="px-6 py-8 text-center text-gray-500 dark:text-gray-400" colSpan={6}>
                                    No timetable generated. Click "Generate Timetable" to start.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
