import React from 'react';
import { TodoCategories, TodoPriorities, Todo } from '@/types/todo';

export function TodoItem({ todo, onUpdate, onDelete, onEdit }) { 
    const handleComplete = () => {
        onUpdate(todo.id, { completed: !todo.completed });
    };

    const handleEdit = () => {
        onEdit(todo); 
    };

    const handleDelete = () => {
        onDelete(todo.id);
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-md shadow-lg">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleComplete}
                    className="mr-4"
                />
                <div>
                    <p
                        className={`font-medium ${todo.completed ? 'line-through text-gray-400' : ''
                            }`}
                    >
                        {todo.title}
                    </p>
                    <p className="text-gray-500 text-sm">
                        Due: {todo.dueDate ? todo.dueDate.toLocaleDateString() : 'No due date'}
                    </p>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <div
                    className={`px-2 py-1 rounded-full text-white text-xs ${todo.category === TodoCategories.WORK
                        ? 'bg-yellow-500'
                        : todo.category === TodoCategories.PERSONAL
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        }`}
                >
                    {todo.category}
                </div>
                <div
                    className={`px-2 py-1 rounded-full text-white text-xs ${todo.priority === TodoPriorities.HIGH
                        ? 'bg-red-500'
                        : todo.priority === TodoPriorities.MEDIUM
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                >
                    {todo.priority}
                </div>
                <button onClick={handleEdit} className="text-gray-500 hover:text-gray-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button>
                <button onClick={handleDelete} className="text-gray-500 hover:text-gray-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}