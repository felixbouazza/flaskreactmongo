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
       Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTEyNzE5MDgsIm5iZiI6MTYxMTI3MTkwOCwianRpIjoiZGY4OTk3MDMtNjUwNi00OGYyLWE1NTQtMWIzMDNlMjc4NGJmIiwiZXhwIjoxNjExODc2NzA4LCJpZGVudGl0eSI6IjYwMGEwNzNkZmExMzUwODdkOTYzMjI4OCIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.acVZkWuRoJHfJwh764f6XmXK3VKNTQjJFtqpW6HgU1I"
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
