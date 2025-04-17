import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CompletedTaskList from '../Components/CompletedTaskList'
import DeletedTaskList from '../Components/DeletedTaskList'
import TaskList from '../Components/TaskList'

export default function TodoRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/taskList' element={<TaskList/>}/>
            <Route path='/completedTask' element={<CompletedTaskList/>} />
            <Route path='/deletedTask' element={<DeletedTaskList/>}/>

        </Routes>
    </div>
  )
}
