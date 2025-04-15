import React from 'react';
import { useForm } from 'react-hook-form';
import { store } from '../redux/store';
import IndexPortal from '../services/portal';

const TaskForm = () => {
  const { register, handleSubmit, reset, formState: { errors }, setError } = useForm();

  const onSubmit = (data) => {
    const isTitleExists = store.getState().some(task =>
      task.todo_title.trim().toLowerCase() === data.todo_title.trim().toLowerCase()
    );

    if (isTitleExists) {
      setError('todo_title', { message: 'A todo with this title already exists' });
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
    reset();
  };

  return (
    <>
      <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#taskModal">Add Task</button>

      <IndexPortal>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Task</h5>
            <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Title</label>
              <input
                {...register('todo_title', { required: 'This is required' })}
                className="form-control mb-2"
                placeholder="Add Title"
              />
              {errors.todo_title && <p className="text-danger">{errors.todo_title.message}</p>}

              <label>Description</label>
              <textarea
                {...register('description', { required: 'Please add description' })}
                className="form-control mb-2"
                placeholder="Description"
              />
              {errors.description && <p className="text-danger">{errors.description.message}</p>}

              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button className="btn btn-primary" type="submit">Save Task</button>
              </div>
            </form>
          </div>
        </div>
      </IndexPortal>
    </>
  );
};

export default TaskForm;
