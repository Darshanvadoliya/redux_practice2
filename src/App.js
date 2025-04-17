import './App.css';
import Main from './Components/Main';
import { TodoProvider } from './Context/TodoContext';
import RoueIndex from './Router';

function App() {

  return (
    <div style={{}}>
      <TodoProvider>
       <RoueIndex/>
      </TodoProvider>
    </div>
  )
}

export default App;