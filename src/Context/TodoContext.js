import { useEffect, useState } from "react";
import { store } from "../redux/store";
import { TodoContext } from "./AllContext"

export function TodoProvider({ children }) {
    const [storeData, setStoreData] = useState([]);
    const [completedTask, setCompletedTask] = useState([])
    const [deletedTask, setDeletedTask] = useState([])
    const [openModel, setOpenModel] = useState(false)

   useEffect(() => {
  const unsubscribe = store.subscribe(() => {
    const allTasks = store.getState();
    setStoreData(allTasks.filter(task => !task.isComplete && !task.isDelete));
    setCompletedTask(allTasks.filter(task => task.isComplete && !task.isDelete));
    setDeletedTask(allTasks.filter(task => task.isDelete));
  });

  return () => unsubscribe(); // Clean up on unmount
}, []);

    {/* Complete task function */ }
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

     {/* Delete task */}
  function deleteTask(id) {
    const currentTodo = store.getState().find((todo) => todo.id === id);

    if (currentTodo) {
      const updatedTodo = {
        ...currentTodo,
        isDelete: false,
      };

      store.dispatch({ type: 'REMOVE_TODO', payload: updatedTodo });
    setDeletedTask(store.getState().filter(task =>  task.isDelete))
    }
  }

  function permanentDeleteTask(id) {
    store.dispatch({ type: 'PERMANENT_DELETE', payload: id });
    setDeletedTask(store.getState().filter(task => task.isDelete));
  }

  {/* restore task data set to DeletedTask*/}
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
        <TodoContext.Provider value={{
            storeData, 
            setStoreData, 
            completedTask, 
            setCompletedTask, 
            deletedTask, 
            setDeletedTask,
            completeTask,
            deleteTask,
            restorTask,
            openModel, setOpenModel,
            permanentDeleteTask }}>
            {children}
        </TodoContext.Provider>
    )
}

