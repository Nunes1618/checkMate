import React from 'react';

const Todo = ({ todo, removeTask, completeTask }) => {
  return (
    <div className="todo" 
    style={{ textDecoration: todo.isCompleted ? "line-through" : ""}}>
            <div className='content'>
              <p>{todo.text}</p>
              <p className='category'>({todo.category})</p>
            </div> 
            <div>
              <button className='complete' onClick={() => completeTask(todo.id)}>Completar tarefa</button>
              <button className='remove' onClick={() => removeTask(todo.id)}>Deletar tarefa</button>
            </div>
          </div>
  );
};

export default Todo;