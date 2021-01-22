import {useState, useEffect} from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {

  const [todos, setTodos] = useState(false)

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = async () => {
    const res = await fetch("/api/todos", {
      method: "GET",
      headers: {
       Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTEzMTY0MDEsIm5iZiI6MTYxMTMxNjQwMSwianRpIjoiZjliMzY5NzctMTJkMy00OGVjLWJiYjAtNGUyYTg3YmM5MmYyIiwiZXhwIjoxNjExOTIxMjAxLCJpZGVudGl0eSI6IjYwMGEwZTM2ZmExMzUwODdkOTYzMjI4YiIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.XgM4V5iYjAW5JGbXCr04Cl3j6kMQHAqSFHoj2GSgx08"
      }
    })
    const data = await res.json()
    setTodos(data)
  }

  const changeTodos = (todoList) => {
    setTodos(todoList)
  }

  return (
    <div className="App">
      <h1>Todo Application</h1>
      {/* Affichage du formulaire de création */}
      <TodoForm todos={todos} changeTodos={changeTodos}/>


      {/* Affichage de la liste des tâches */}
      {todos ? (
          <TodoList todos={todos} changeTodos={changeTodos}/>
      ) : (
          <>
          Pas de tâche à faire
          </>
      )}
    </div>
  );
}

export default App;
