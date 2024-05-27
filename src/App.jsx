import { useEffect, useState } from 'react'

import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import Search from './components/Search';

import "./App.css";
import Filter from './components/Filter';

// importação da fonte poppins no projeto e repassada no App.css
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);


function App() {
  const loadTodos = () => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  };
  
  const [todos, setTodos] = useState(loadTodos);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, category) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 10000),
        text, 
        category,
        isCompleted: false,
      },
    ];

    setTodos(newTodos);
  };

  const removeTask = (id) => {
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter((todo) => 
      todo.id !== id ? todo : null 
    );
    setTodos(filteredTodos);
  };

  const completeTask = (id) => {
    const newTodos = [...todos];
    newTodos.map((todo) => 
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    );
    setTodos(newTodos);
  };

  return (
    <div className="app container">
      <h1 className='text-center my-4'>Lista de tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className="todo-list">
        {todos
        .filter((todo) => 
          filter === "All"
            ? true
            : filter === "Completed"
            ? todo.isCompleted
            : !todo.isCompleted
        )
        .filter((todo) => 
          todo.text.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => 
          sort === "Asc"
            ? a.text.localeCompare(b.text)
            : b.text.localeCompare(a.text)
        )
        .map((todo) => (
            <Todo 
            key={todo.id} 
            todo={todo} 
            removeTask={removeTask} 
            completeTask={completeTask} />
        ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;
