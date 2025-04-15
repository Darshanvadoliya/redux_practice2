import React from 'react';
import { store } from '../redux/store';

const TaskList = ({ tasks }) => {
  const completeTask = (id) => {
    const todo = store.getState().find(task => task.id === id);
    if (todo) {
      store.dispatch({ type: 'UPDATE_TODO', payload: { ...todo, isComplete: !todo.isComplete } });
    }
  };

  const deleteTask = (id) => {
    const todo = store.getState().find(task => task.id === id);
    if (todo) {
      store.dispatch({ type: 'REMOVE_TODO', payload: { ...todo, isDelete: true } });
    }
  };

  return tasks.length ? (
    <div className='mt-4'>
      <h3>All Tasks</h3>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>No.</th><th>Title</th><th>Description</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, i) => (
            <tr key={task.id}>
              <td>{i + 1}</td>
              <td>{task.todo_title}</td>
              <td>{task.description}</td>
              <td>
                <button onClick={() => completeTask(task.id)} className="btn btn-success btn-sm me-2">
                  {task.isComplete ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => deleteTask(task.id)} className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default TaskList;
