import React from 'react'

export default function TodoList({todos, deleteTodo, updateTodo}) {

    const fetchNewTodoState = async (id) => {
        const url = "/api/todos/" + id
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: true
            })
        })
        updateTodo(id)
    }

    const fetchDeleteTodo = async (id) => {
        const url = "/api/todos/" + id
        const res = await fetch(url, {
            method: 'DELETE'
        })
        deleteTodo(id) 
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
