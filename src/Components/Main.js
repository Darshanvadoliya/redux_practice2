import React, { useContext } from 'react'
import TaskForm from './TaskForm'
import { TodoContext } from '../Context/AllContext'
import { FaPlus } from 'react-icons/fa';

function Main() {
    const { openModel, setOpenModel } = useContext(TodoContext)
    return (
        <>
            <button
                type="button"
                className="btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-circle shadow-lg"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style={{ width: '60px', height: '60px' }}
                title="Add Task"
            >
                <FaPlus />
            </button>

            <TaskForm />
        </>
    )
}

export default Main