import reactDOM from 'react-dom'
import AddTaskPortal from './AddTaskPortal'

function IndexPortal({ children }) {
  return reactDOM.createPortal(
    <>
        <AddTaskPortal>{children}</AddTaskPortal>
    </>,
    document.getElementById("root-for-modals")
  )
}

export default IndexPortal