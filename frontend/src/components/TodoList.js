import React from 'react'

export default function TodoList({todos, changeTodos}) {

    const fetchNewTodoState = async (id) => {
        const url = "/api/todos/" + id
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTEyNzE5MDgsIm5iZiI6MTYxMTI3MTkwOCwianRpIjoiZGY4OTk3MDMtNjUwNi00OGYyLWE1NTQtMWIzMDNlMjc4NGJmIiwiZXhwIjoxNjExODc2NzA4LCJpZGVudGl0eSI6IjYwMGEwNzNkZmExMzUwODdkOTYzMjI4OCIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.acVZkWuRoJHfJwh764f6XmXK3VKNTQjJFtqpW6HgU1I"
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
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTEyNzE5MDgsIm5iZiI6MTYxMTI3MTkwOCwianRpIjoiZGY4OTk3MDMtNjUwNi00OGYyLWE1NTQtMWIzMDNlMjc4NGJmIiwiZXhwIjoxNjExODc2NzA4LCJpZGVudGl0eSI6IjYwMGEwNzNkZmExMzUwODdkOTYzMjI4OCIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.acVZkWuRoJHfJwh764f6XmXK3VKNTQjJFtqpW6HgU1I"
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
