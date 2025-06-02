import * as React from 'react';

function reducer(tasks, action) {
  switch (action.type) {
    case 'add':
      return [...tasks, { id: tasks.length + 1, task: action.task }];

    case 'update':
      console.log('update', action.id);
      console.log('update', tasks);
      return tasks.map((item) =>
        item.id === action.id ? { ...item, status: 'done' } : item
      );

    case 'delete':
      console.log('delete');
      return tasks.filter((item) => item.id !== action.id);

    default:
      return tasks;
  }
}

export default function TaskManager() {
  const [tasks, dispatch] = React.useReducer(reducer, [{ id: 1, task: 'kcbakdjasbd' }]);

  const createTask = (title) => {
    return title;
  };

  const handleUpdateTaskStatus = (id) => {
    dispatch({ type: 'update', id });
  };

  const handleDeleteTask = (id) => {
    dispatch({ type: 'delete', id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById('taskForm');
    const formData = new FormData(form);
    dispatch({ type: 'add', task: createTask(formData.get('task')) });

    e.target.reset();
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit} id="taskForm">
        <input name="task" placeholder="Task title" />
        <button className="primary" type="submit">
          Add Task
        </button>
      </form>

      <ol>
        {tasks.map((item, index) => (
          <>
            <li key={item.index}>{item.task}</li>
            <button onClick={() => handleUpdateTaskStatus(item.id)}>V</button>
            <button onClick={() => handleDeleteTask(item.id)}>X</button>
            {item.status === 'done' && <p>Done</p>}
          </>
        ))}
      </ol>
    </div>
  );
}
