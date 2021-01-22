import React from 'react'

export default function TodoList({todos, changeTodos}) {

    const fetchNewTodoState = async (id) => {
        const url = "/api/todos/" + id
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTEzMTY0MDEsIm5iZiI6MTYxMTMxNjQwMSwianRpIjoiZjliMzY5NzctMTJkMy00OGVjLWJiYjAtNGUyYTg3YmM5MmYyIiwiZXhwIjoxNjExOTIxMjAxLCJpZGVudGl0eSI6IjYwMGEwZTM2ZmExMzUwODdkOTYzMjI4YiIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.XgM4V5iYjAW5JGbXCr04Cl3j6kMQHAqSFHoj2GSgx08"
            },
            body: JSON.stringify({
                status: true
            })
        })
        const data = await res.json()
        changeTodos(data)
    }

    const fetchDeleteTodo = async (id) => {
        const url = "/api/todos/" + id
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTEzMTY0MDEsIm5iZiI6MTYxMTMxNjQwMSwianRpIjoiZjliMzY5NzctMTJkMy00OGVjLWJiYjAtNGUyYTg3YmM5MmYyIiwiZXhwIjoxNjExOTIxMjAxLCJpZGVudGl0eSI6IjYwMGEwZTM2ZmExMzUwODdkOTYzMjI4YiIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.XgM4V5iYjAW5JGbXCr04Cl3j6kMQHAqSFHoj2GSgx08"
            }
        })
        const data = await res.json()
        changeTodos(data) 
    }

    return (
        <ul>
        {todos.map(todo => {
            return(
              <>
                <li style={{margin: "10px 0"}}>{todo.name}
                    {todo.status ? 
                        (
                        <>
                            <i className="fas fa-check-square" style={{margin: "0 5px", color: "green"}}>Fait</i>
                        </>
                        ) 
                        : 
                        (
                        <>
                            <i className="fas fa-times" style={{margin: "0 15px", color: "red"}}>Pas fait</i>
                            <button style={{margin: "0 15px"}} onClick={() => fetchNewTodoState(todo["_id"]["$oid"])}> Fait !</button>

                        </>
                        )}
                        <button onClick={() => fetchDeleteTodo(todo["_id"]["$oid"])}> Supprimer </button>
                </li>
              </>
            )
        })}
        </ul>
    )
}
