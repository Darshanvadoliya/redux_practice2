import React, { useContext } from 'react'
import { TodoContext } from '../Context/AllContext'
import Header from './Header'
import { FaTrashAlt } from 'react-icons/fa';


function DeletedTaskList() {
  const {deletedTask, deleteTask, permanentDeleteTask} = useContext(TodoContext)
  console.log("deletedTask",deletedTask);
  
  return (
    <div className='todoList d-flex flex-column align-items-center' >
      <Header />
      <div className='mb-4'>
        <h2 className="text-danger">🗑️ Deleted Task List</h2>
      </div>

      <table
        className='table table-hover table-bordered shadow-sm'
        style={{ width: '90%', borderRadius: '10px', overflow: 'hidden' }}
      >
        <thead className='table-dark'>
          <tr>
            <th style={{ width: '5%' }}>No.</th>
            <th style={{ width: '20%' }}>Title</th>
            <th style={{ width: '60%' }}>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        {deletedTask && deletedTask.length > 0 ? (
          <tbody className=''>
            {deletedTask.map((todo, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td className=''>{todo.todo_title}</td>
                <td className=''>{todo.description}</td>
                <td>
                  <div className='d-flex gap-2'>
                    <button
                      onClick={() => permanentDeleteTask(todo.id)}
                      className='btn btn-sm btn-danger'
                      title='Permanently Delete'
                    >
                      <FaTrashAlt /> Delete
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
                No deleted tasks. Clean bin = clear mind ✨
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}

export default DeletedTaskList