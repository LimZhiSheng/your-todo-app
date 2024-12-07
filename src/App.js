import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Calendar } from './components/Calendar';


function App() {
    const [view, setView] = useState('list');

    return (
        <div className="app">
            <header>
                <h1 className="flex justify-center todo-title font-bold mb-4">TODO LIST</h1>
                <div className="flex justify-center space-x-4 mb-4">
                    <button
                        className={`px-4 py-2 rounded-md ${view === 'list' ? 'bg-gray-200' : 'hover:bg-gray-200'
                            }`}
                        onClick={() => setView('list')}
                    >
                        List
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${view === 'calendar' ? 'bg-gray-200' : 'hover:bg-gray-200'
                            }`}
                        onClick={() => setView('calendar')}
                    >
                        Calendar
                    </button>
                </div>
            </header>

            {view === 'list' ? <TodoList /> : <Calendar />}
        </div>
    );
}

export default App;