// src/components/TodoItem.js
export const TodoCategories = {
    WORK: 'Work',
    PERSONAL: 'Personal',
    URGENT: 'Urgent'
};

export const TodoPriorities = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High'
};

export class Todo {
    constructor(
        title,
        category = TodoCategories.PERSONAL,
        priority = TodoPriorities.LOW,
        dueDate = null,
        completed = false
    ) {
        this.id = Date.now().toString();
        this.title = title;
        this.category = category;
        this.priority = priority;
        this.dueDate = dueDate;
        this.completed = completed;
        this.createdAt = new Date();
    }
}