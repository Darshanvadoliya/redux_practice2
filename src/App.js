import { useState } from 'react';
import './App.css';
import { store } from './redux/store';
import { useForm } from 'react-hook-form';
import IndexPortal from './services/portal';
import { isDisabled } from '@testing-library/user-event/dist/utils';

function App() {

  const [storeData, setStoreData] = useState([]);
  const [completedTask, setCompletedTask] = useState([])
  const [deletedTask, setDeletedTask] = useState([])
  const [openModel, setOpenModel] = useState(false)
  console.log("storeData", storeData);
  console.log("deletedTask",deletedTask);
  

  console.log('completedTask', completedTask);

  store.subscribe(() => {
    setStoreData(store.getState());
    let allTasks = store.getState();
    setStoreData(allTasks.filter(task => !task.isComplete && !task.isDelete));
    setCompletedTask(allTasks.filter(task => task.isComplete && !task.isDelete));
    setDeletedTask(allTasks.filter(task => task.isDelete))
  });

  const { register, handleSubmit, reset, formState: {errors},setError } = useForm()

  function onSubmit(data) {
    const isTitle = store.getState().some((task) => task.todo_title.trim().toLowerCase() === data.todo_title.trim().toLowerCase())
    if(isTitle){
      setError('todo_title',{
        message: 'A todo with this title already exists',
      })
      return;
    }
    const newTodo = {
      id: Date.now(),
      todo_title: data.todo_title,
      description: data.description,
      isComplete: false,
      isDelete: false,
    };

    store.dispatch({ type: 'ADD_TODO', payload: newTodo });
    reset()
  }

  function completeTask(id) {

    const currentTodo = store.getState().find((todo) => todo.id === id);

    if (currentTodo) {
      const updatedTodo = {
        ...currentTodo,
        isComplete: !currentTodo.isComplete,
      };

      store.dispatch({ type: 'UPDATE_TODO', payload: updatedTodo });
      setStoreData(store.getState().filter(task => !task.isComplete && !task.isDelete));
    }
  }

  function deleteTask(id) {
    const currentTodo = store.getState().find((todo) => todo.id === id);

    if (currentTodo) {
      const updatedTodo = {
        ...currentTodo,
        isDelete: true,
      };

      store.dispatch({ type: 'REMOVE_TODO', payload: updatedTodo });
    setDeletedTask(store.getState().filter(task => task.isComplete && task.isDelete))
    }
  }

  function restorTask(id) {

    const currentTodo = store.getState().find((todo) => todo.id === id);

    if (currentTodo) {
      const updatedTodo = {
        ...currentTodo,
        isDelete: true,
      };

      store.dispatch({ type: 'RESTOR_TODO', payload: updatedTodo });
      setDeletedTask(store.getState().filter(task => task.isDelete));
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* Add task handel form using useForm hook*/}

      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add Task
      </button>

      <IndexPortal>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Task</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {/* <div className='bg-body-secondary p-4 d-inline-block w-50 rounded-3'> */}
            {/* <h2 className='mb-3'>Add Task</h2> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Title</label>
              <input
                type='text'
                placeholder='Add Title'
                {...register('todo_title',
                  { required: "This is required" },
                )}
                style={{ width: '200px', height: '30px' }}
                className='border-1 p-2 rounded-2 w-100'
              />
              {errors.todo_title && <p style={{ color: "red", margin: '0 0 7px 0' }}>{errors.todo_title.message}</p>}              
              
              <label>Description</label>
              <textarea
                placeholder='Description'
                {...register('description',
                  { required : "pls add description"}
                )}
                style={{ width: '200px', height: '70px', marginTop: '10px' }}
                className='border-1 p-2 rounded-2 w-100'
              />
              {errors.description && <p style={{ color: "red", margin: '0 0 7px 0' }}>{errors.description.message}</p>}

              {/* <button type='submit' className='btn btn-secondary'>Add</button> */}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Save task</button>
              </div>
            </form>
            {/* </div> */}
          </div>
        </div>
      </IndexPortal>


      {/* all task list */}
      <div className='todoList d-flex flex-column align-items-center' style={{ marginTop: '20px' }}>
        <div className='text-center mb-4'><h2>All Task List  </h2></div>
        {storeData && storeData.length > 0 ? <table className='table table-light table-striped' style={{width:'90%'}}>
          <thead>
            <tr>
              <th style={{ width: '5%' }}>No.</th>
              <th style={{ width: '20%' }}>Title</th>
              <th style={{ width: '55%' }}>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-danger'>
            {storeData.map((todo, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{todo.todo_title}</td>
                  <td>{todo.description}</td>
                  <td> <div className=''>
                    <button onClick={() => completeTask(todo.id)} className={`btn ${todo.isComplete === false ? 'btn-success' : 'btn-secondary'} me-2 btn-sm`}>
                      {todo.isComplete ? 'Undo Task' : 'Complete now'}
                    </button>
                    <button onClick={() => restorTask(todo.id)} className='btn btn-danger btn-sm'>deleteTask</button>
                  </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table> : ''}
      </div>

      {/* Completed task list */}
      <div className='todoList d-flex flex-column align-items-center' style={{ marginTop: '20px' }}>
        <div className='text-center mb-4'><h2>Completed Task List  </h2></div>
        {completedTask && completedTask.length > 0 ? <table className='table table-light table-striped' style={{width:'90%'}}>
          <thead>
            <tr>
              <th style={{ width: '5%' }}>No.</th>
              <th style={{ width: '20%' }}>Title</th>
              <th style={{ width: '55%' }}>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-danger'>
            {completedTask.map((todo, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{todo.todo_title}</td>
                  <td>{todo.description}</td>
                  <td> <div className=''>
                    <button onClick={() => completeTask(todo.id)} className={`btn ${todo.isComplete === false ? 'btn-success' : 'btn-secondary'} me-2 btn-sm`}>
                      {todo.isComplete ? 'Undo Task' : 'Complete now'}
                    </button>
                    <button onClick={() => restorTask(todo.id)} className='btn btn-danger btn-sm'>deleteTask</button>
                  </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table> : ''}
      </div>

      {/* deleted task*/}
      <div className='todoList d-flex flex-column align-items-center' style={{ marginTop: '20px' }}>
        <div className='text-center mb-4'><h2>Deleted Task List  </h2></div>
        {deletedTask && deletedTask.length > 0 ? <table className='table table-light table-striped' style={{width:'90%'}}>
          <thead>
            <tr>
              <th style={{ width: '5%' }}>No.</th>
              <th style={{ width: '20%' }}>Title</th>
              <th style={{ width: '50%' }}>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-danger'>
            {deletedTask.map((todo, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{todo.todo_title}</td>
                  <td>{todo.description}</td>
                  <td> <div className=''>
                    {/* <button onClick={() => completeTask(todo.id)} className={`btn ${todo.isComplete === false ? 'btn-success' : 'btn-secondary'} me-2 btn-sm`}>
                      {todo.isComplete ? 'Undo Task' : 'Complete now'}
                    </button> */}
                    <button onClick={() => deleteTask(todo.id)} className='btn btn-danger btn-sm'>permanent delete</button>
                  </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table> : ''}
      </div>

    </div>
  )
}

export default App;

// <div className='col-6'>
//   <div key={todo.id} className='mb-3  p-3 bg-body-secondary '>
//     <h5>Task : { i + 1 }</h5>
//     <div className='d-block '>
//       <h5 className={`bg-body-tertiary p-2 rounded-2 ${todo.isComplete ? 'text-decoration-line-through text-muted' : ''}`}>{todo.todo_title}</h5>
//       <p className={`bg-body-tertiary p-2 rounded-2 ${todo.isComplete ? 'text-decoration-line-through text-muted' : ''}`}> {todo.description}</p>
//       {/* {todo.isComplete ? ' ✅' : ''} */}
//     </div>

//     <div className=''>
//       <button onClick={() => completeTask(todo.id)} className={`btn ${todo.isComplete === false ? 'btn-success' : 'btn-secondary'} me-2 btn-sm`}>
//         {todo.isComplete ? 'Undo Task' : 'Complete now'}
//       </button>
//       <button onClick={() =>  deleteTask(todo.id) } className='btn btn-danger btn-sm'>deleteTask</button>
//     </div>
//   </div>
// </div>