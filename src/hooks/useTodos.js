import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';
import Papa from 'papaparse';

export function useTodos() {
    const [todos, setTodos] = useState([]);

    // Load todos from localStorage on initial render
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
        setTodos(storedTodos.map(todo => {
            const todoObj = new Todo(
                todo.title,
                todo.category,
                todo.priority,
                // Convert date string back to Date object if it exists
                todo.dueDate ? new Date(todo.dueDate) : null,
                todo.completed
            );
            todoObj.id = todo.id;
            return todoObj;
        }));
    }, []);

    // Save todos to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // Add a new todo
    const addTodo = (todoData) => {
        const newTodo = new Todo(
            todoData.title,
            todoData.category,
            todoData.priority,
            todoData.dueDate,
            todoData.completed
        );
        setTodos([...todos, newTodo]);
        return newTodo;
    };

    const addTodos = (newTodos) => {
        setTodos((prevTodos) => [...prevTodos, ...newTodos]);
    };


    // Update an existing todo
    const updateTodo = (id, updates) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, ...updates } : todo
        ));
    };

    // Delete a todo
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    // Filter and sort todos
    const filterTodos = (filters = {}) => {
        return todos.filter(todo => {
            const matchesSearch = !filters.search ||
                todo.title.toLowerCase().includes(filters.search.toLowerCase());

            const matchesCategory = !filters.category ||
                todo.category === filters.category;

            const matchesCompletionStatus = filters.completed === undefined ||
                todo.completed === filters.completed;

            return matchesSearch &&
                matchesCategory &&
                matchesCompletionStatus;
        }).sort((a, b) => {
            if (filters.sortBy === 'dueDate') {
                return filters.sortOrder === 'asc'
                    ? (a.dueDate || Infinity) - (b.dueDate || Infinity)
                    : (b.dueDate || Infinity) - (a.dueDate || Infinity);
            }
            return 0;
        });
    };

    const exportTodos = (format = 'csv') => {
        if (format === 'csv') {
            // Use PapaParse to convert todos to CSV
            const csv = Papa.unparse(todos);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'todos.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };


    return {
        todos,
        addTodo,
        addTodos,
        updateTodo,
        deleteTodo,
        filterTodos,
        exportTodos
    };
}