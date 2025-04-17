import React from 'react'
import { useContext } from 'react'
import { TodoContext } from '../Context/AllContext'
import Header from './Header'
import { FaUndo, FaTrash } from 'react-icons/fa';

function CompletedTaskList() {
  const { completedTask, restorTask, completeTask } = useContext(TodoContext)
  return (
    <div className='todoList d-flex flex-column align-items-center' >
      <Header />
      <div className='mb-4'>
        <h2 className="text-success">✅ Completed Task List</h2>
      </div>

      <table
        className='table table-hover table-bordered shadow-sm'
        style={{ width: '90%', borderRadius: '10px', overflow: 'hidden' }}
      >
        <thead className='table-dark'>
          <tr>
            <th style={{ width: '5%' }}>No.</th>
            <th style={{ width: '20%' }}>Title</th>
            <th style={{ width: '55%' }}>Description</th>
            <th style={{ width: '10%' }}>Actions</th>
          </tr>
        </thead>

        {completedTask && completedTask.length > 0 ? (
          <tbody>
            {completedTask.map((todo, i) => (
              <tr key={i} className=''>
                <td>{i + 1}</td>
                <td className=''>
                  {todo.todo_title}
                </td>
                <td className=''>
                  {todo.description}
                </td>
                <td>
                  <div className='d-flex gap-2'>
                    <button
                      onClick={() => completeTask(todo.id)}
                      className='btn btn-sm btn-secondary'
                      title='Undo Task'
                    >
                      <FaUndo />
                    </button>

                    <button
                      onClick={() => restorTask(todo.id)}
                      className='btn btn-sm btn-danger'
                      title='Delete Task'
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
              <td colSpan='4' className='text-center text-muted py-4'>
                No completed tasks yet. Get things done and see them here!
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}

export default CompletedTaskList