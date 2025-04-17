import React, { useContext } from 'react'
import { TodoContext } from '../Context/AllContext'
import Header from './Header'
import { FaCheck, FaUndo, FaTrash } from 'react-icons/fa'; // Install react-icons if needed

function TaskList() {
  const { storeData, restorTask, completeTask } = useContext(TodoContext)
  return (
  <div className='todoList d-flex flex-column align-items-center'>
    <Header />
    <div className='mb-4'>
      <h2 className="text-primary">All Task List</h2>
    </div>

    <table className='table table-hover table-bordered shadow-sm' style={{ width: '90%', borderRadius: '10px', overflow: 'hidden' }}>
      <thead className='table-dark'>
        <tr>
          <th style={{ width: '5%' }}>No.</th>
          <th style={{ width: '20%' }}>Title</th>
          <th style={{ width: '55%' }}>Description</th>
          <th style={{ width: '10%' }}>Actions</th>
        </tr>
      </thead>

      {storeData && storeData.length > 0 ? (
        <tbody>
          {storeData.map((todo, i) => (
            <tr key={i} className={todo.isComplete ? 'table-success' : ''}>
              <td>{i + 1}</td>
              <td className={todo.isComplete ? 'text-decoration-line-through text-muted' : ''}>
                {todo.todo_title}
              </td>
              <td className={todo.isComplete ? 'text-decoration-line-through text-muted' : ''}>
                {todo.description}
              </td>
              <td>
                <div className='d-flex gap-2'>
                  <button
                    onClick={() => completeTask(todo.id)}
                    className={`btn btn-sm ${todo.isComplete ? 'btn-secondary' : 'btn-success'}`}
                    title={todo.isComplete ? 'Undo Task' : 'Mark as Complete'}
                  >
                    {todo.isComplete ? <FaUndo /> : <FaCheck />}
                  </button>

                  <button
                    onClick={() => restorTask(todo.id)}
                    className='btn btn-sm btn-danger'
                    title="Delete Task"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody>
          <tr>
            <td colSpan="4" className="text-center text-muted py-4">
              No tasks available. Add some to get started!
            </td>
          </tr>
        </tbody>
      )}
    </table>
  </div>
);
}

export default TaskList