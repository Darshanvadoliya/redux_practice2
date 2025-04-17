import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import TodoRoutes from './TodoRoutes'

function RoueIndex() {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/todo/*' element={<TodoRoutes/>}/>
            </Routes>
        </Router>
    </div>
  )
}

export default RoueIndex