import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { Filters } from './Filters';
import { AddTodo } from './AddTodo';
import { TodoItem } from './TodoItem';
import { EditTodoModal } from './EditTodoModal';
import Papa from 'papaparse';

export function TodoList() {
    const { todos, addTodo, addTodos, updateTodo, deleteTodo, filterTodos, exportTodos } = useTodos();
    const [filters, setFilters] = useState({});
    const [editingTodo, setEditingTodo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage, setTodosPerPage] = useState(10);
    const [showAddTodoForm, setShowAddTodoForm] = useState(false);

    // Handle Import
    const handleImport = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            complete: (results) => {
                const importedTodos = results.data.map((todo, index) => ({
                    id: todo.id ? todo.id.toString() : `generated-id-${Date.now()}-${index}`,
                    title: todo.title || "Untitled Todo",
                    category: todo.category || "Personal",
                    priority: todo.priority || "Medium",
                    dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
                    completed: todo.completed === 'true',
                    createdAt: todo.createdAt ? new Date(todo.createdAt) : new Date(),
                }));
                addTodos(importedTodos);
            },
        });
    };

    // Apply filters and pagination
    const filteredTodos = filterTodos(filters);
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
    const totalPages = Math.max(1, Math.ceil(filteredTodos.length / todosPerPage));

    return (
        <div className="todo-list">
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => setShowAddTodoForm(true)}
                    >
                        + ADD NEW
                    </button>
                    <label
                        htmlFor="import-file"
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer"
                    >
                        Import
                    </label>
                    <input
                        id="import-file"
                        type="file"
                        accept=".csv,.xlsx"
                        className="hidden"
                        onChange={handleImport}
                    />
                    <button
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                        onClick={() => exportTodos('csv')}
                    >
                        Export
                    </button>
                </div>
                <Filters onFilterChange={setFilters} />
            </div>

            {showAddTodoForm && (
                <AddTodo
                    onAddTodo={(newTodo) => {
                        addTodo(newTodo);
                        setShowAddTodoForm(false);
                    }}
                    onCancel={() => setShowAddTodoForm(false)}
                />
            )}

            <div className="space-y-2">
                {currentTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onUpdate={updateTodo}
                        onDelete={deleteTodo}
                        onEdit={(todo) => setEditingTodo(todo)}
                    />
                ))}
            </div>

            {editingTodo && (
                <EditTodoModal
                    todo={editingTodo}
                    onUpdateTodo={(id, updatedTodo) => {
                        updateTodo(id, updatedTodo);
                        setEditingTodo(null);
                    }}
                    onCancel={() => setEditingTodo(null)}
                />
            )}

            <div className="pagination flex justify-between items-center mt-4">
                <div className="flex-grow flex justify-center space-x-2">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {Math.max(1, totalPages)}
                    </span>
                    <button
                        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                </div>
                <select
                    className="px-2 py-1 border rounded-md"
                    value={todosPerPage}
                    onChange={(e) => setTodosPerPage(Number(e.target.value))}
                >
                    {[5, 10, 15, 20].map((num) => (
                        <option key={num} value={num}>
                            {num} per page
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
