import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';

export function Calendar() {
    const { todos } = useTodos();
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Generate calendar grid
    const generateCalendarDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const calendarDays = [];

        // Add previous month's days to fill first week
        const startingDay = firstDayOfMonth.getDay();
        for (let i = 0; i < startingDay; i++) {
            calendarDays.push(null);
        }

        // Add days of current month
        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            const date = new Date(year, month, day);
            calendarDays.push(date);
        }

        return calendarDays;
    };

    // Get todos for a specific date
    const getTodosForDate = (date) => {
        return todos.filter(todo => {
            // Ensure todo.dueDate is a Date object
            if (!todo.dueDate || !(todo.dueDate instanceof Date)) {
                return false;
            }

            // Compare year, month, and day
            return todo.dueDate.getFullYear() === date.getFullYear() &&
                todo.dueDate.getMonth() === date.getMonth() &&
                todo.dueDate.getDate() === date.getDate();
        });
    };

    // Render calendar
    const renderCalendar = () => {
        const days = generateCalendarDays();
        const weeks = [];
        let week = [];

        days.forEach((day, index) => {
            week.push(
                <td
                    key={index}
                    className={`p-2 border ${day ? 'bg-white' : 'bg-gray-100'}`}
                >
                    {day && (
                        <div>
                            <div className="font-bold text-sm mb-1">{day.getDate()}</div>
                            {getTodosForDate(day).map(todo => (
                                <div
                                    key={todo.id}
                                    className={`text-xs p-1 rounded mb-1 
                                        ${todo.category === 'Work' ? 'bg-yellow-200' :
                                            todo.category === 'Personal' ? 'bg-green-200' :
                                                'bg-red-200'}`}
                                >
                                    {todo.title}
                                </div>
                            ))}
                        </div>
                    )}
                </td>
            );

            if ((index + 1) % 7 === 0 || index === days.length - 1) {
                weeks.push(<tr key={weeks.length}>{week}</tr>);
                week = [];
            }
        });

        return weeks;
    };

    // Navigate between months
    const changeMonth = (increment) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() + increment);
        setCurrentMonth(newMonth);
    };

    return (
        <div className="p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => changeMonth(-1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Previous
                </button>
                <h2 className="text-xl font-bold">
                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                    onClick={() => changeMonth(1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Next
                </button>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <th key={day} className="p-2 border bg-gray-200">{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {renderCalendar()}
                </tbody>
            </table>
        </div>
    );
}