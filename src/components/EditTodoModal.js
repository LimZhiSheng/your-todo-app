import React, { useState, useEffect } from 'react';
import { TodoCategories, TodoPriorities } from '@/types/todo';

export function EditTodoModal({ todo, onUpdateTodo, onCancel }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(TodoCategories.PERSONAL);
    const [priority, setPriority] = useState(TodoPriorities.LOW);
    const [dueDate, setDueDate] = useState('');
    const [completed, setCompleted] = useState(false);

    // Populate form with existing todo data when component mounts
    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setDescription(todo.description || '');
            setCategory(todo.category);
            setPriority(todo.priority);
            setDueDate(todo.dueDate ? todo.dueDate.toISOString().substr(0, 10) : '');
            setCompleted(todo.completed);
        }
    }, [todo]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert('Please enter a task title');
            return;
        }

        const updatedTodo = {
            ...todo,
            title,
            description,
            category,
            priority,
            dueDate: dueDate ? new Date(dueDate) : null,
            completed
        };

        onUpdateTodo(todo.id, updatedTodo);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-md shadow-lg w-full max-w-md"
            >
                <h2 className="text-xl font-bold mb-4">Edit Todo</h2>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <div className="flex justify-between">
                        <label className="font-medium">Category:</label>
                        <div className="flex space-x-2">
                            {Object.values(TodoCategories).map((cat) => (
                                <div key={cat} className="flex items-center">
                                    <input
                                        type="radio"
                                        id={`category-${cat}`}
                                        name="category"
                                        value={cat}
                                        checked={category === cat}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`category-${cat}`}>{cat}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between">
                        <label className="font-medium">Priority:</label>
                        <div className="flex space-x-2">
                            {Object.values(TodoPriorities).map((pri) => (
                                <div key={pri} className="flex items-center">
                                    <input
                                        type="radio"
                                        id={`priority-${pri}`}
                                        name="priority"
                                        value={pri}
                                        checked={priority === pri}
                                        onChange={(e) => setPriority(e.target.value)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`priority-${pri}`}>{pri}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="font-medium">Due Date:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>


                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}