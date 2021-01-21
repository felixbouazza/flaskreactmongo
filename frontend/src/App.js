import {useState, useEffect} from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {

  const [todos, setTodos] = useState(false)

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = async () => {
    const res = await fetch("/api/todos")
    const data = await res.json()
    setTodos(data)
  }

  const addTodos = (newTodo) => {
    const newTodos = [newTodo, ...todos]
    setTodos(newTodos)
  }

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo["_id"]["$oid"] !== id)
    setTodos(newTodos)
  } 

  const updateTodos = (id) => {
    const newTodos = todos.map(todo => {
      if(todo["_id"]["$oid"] === id) {
        return {
          ...todo,
          status: true
        }
      }
    })
    setTodos(newTodos)
  }

  return (
    <div className="App">
      <h1>Todo Application</h1>
      {/* Affichage du formulaire de création */}
      <TodoForm todos={todos} addTodos={addTodos}/>


      {/* Affichage de la liste des tâches */}
      {todos ? (
          <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodos}/>
      ) : (
          <>
          Pas de tâche à faire
          </>
      )}
    </div>
  );
}

export default App;
