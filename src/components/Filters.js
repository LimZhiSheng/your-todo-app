import React, { useState } from 'react';
import { TodoCategories } from '@/types/todo';

export function Filters({ onFilterChange }) {
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        completed: undefined
    });

    const handleFilterChange = (newFilters) => {
        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    return (
        <div className="filters flex space-x-4 mb-4">
            <input
                type="text"
                placeholder="Search tasks..."
                value={filters.search}
                onChange={(e) => handleFilterChange({ search: e.target.value })}
                className="px-2 py-1 border rounded-md"
            />

            <select
                value={filters.category}
                onChange={(e) => handleFilterChange({ category: e.target.value })}
                className="px-2 py-1 border rounded-md"
            >
                <option value="">All Categories</option>
                {Object.values(TodoCategories).map(category => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            <select
                value={filters.completed === undefined ? '' : filters.completed}
                onChange={(e) => {
                    const value = e.target.value === ''
                        ? undefined
                        : e.target.value === 'true';
                    handleFilterChange({ completed: value });
                }}
                className="px-2 py-1 border rounded-md"
            >
                <option value="">All Status</option>
                <option value="true">Completed</option>
                <option value="false">Incomplete</option>
            </select>
        </div>
    );
}
