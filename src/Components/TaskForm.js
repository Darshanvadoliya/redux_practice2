import React, { useRef, } from 'react'
import { useForm } from 'react-hook-form';
import IndexPortal from '../services/portal';
import { store } from '../redux/store';


function TaskForm() {
  const { register, handleSubmit, reset, formState: { errors }, setError } = useForm()
  const closeBtnRef = useRef()
  function onSubmit(data) {

    const isTitle = store.getState().some((task) => task.todo_title.trim().toLowerCase() === data.todo_title.trim().toLowerCase())
    if (isTitle) {
      setError('todo_title', {
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

    if (closeBtnRef.current) {
      closeBtnRef.current.click()
    }
  }
  return (
    <>
      <IndexPortal>
        <div className="modal-content border-0 shadow rounded-4 animate__animated animate__fadeInDown">
          <div className="modal-header text-white rounded-top-4">
            <h1 className="modal-title fs-5">📝 Add New Task</h1>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" ref={closeBtnRef}></button>
          </div>

          <div className="modal-body p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Title</label>
                <input
                  type='text'
                  placeholder='e.g. Grocery Shopping'
                  {...register('todo_title', { required: "This is required" })}
                  className={`form-control ${errors.todo_title ? 'is-invalid' : ''} shadow-sm`}
                />
                {errors.todo_title && (
                  <div className="invalid-feedback">{errors.todo_title.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  placeholder='Write task details...'
                  {...register('description', { required: "Please add description" })}
                  className={`form-control ${errors.description ? 'is-invalid' : ''} shadow-sm`}
                  rows={4}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description.message}</div>
                )}
              </div>

              <div className="modal-footer border-0 mt-4">
                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-4 fw-bold shadow-sm">
                  Save Task 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      </IndexPortal>

    </>
  )
}

export default TaskForm