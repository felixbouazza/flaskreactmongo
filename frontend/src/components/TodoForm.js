import React from 'react'
import { useForm } from "react-hook-form";

export default function TodoForm({todos, changeTodos}) {

    const {register, handleSubmit } = useForm()
    
    const onSubmit = async (data) => {
        if(!data.name) {
            throw new Error("Aucun nom n'a été renseigné !")
        } else {
            const newTodos = todos.filter(todo => todo.name === data.name)
            if(newTodos.length === 0) {
                const res = await fetch('/api/todos', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTEzMTY0MDEsIm5iZiI6MTYxMTMxNjQwMSwianRpIjoiZjliMzY5NzctMTJkMy00OGVjLWJiYjAtNGUyYTg3YmM5MmYyIiwiZXhwIjoxNjExOTIxMjAxLCJpZGVudGl0eSI6IjYwMGEwZTM2ZmExMzUwODdkOTYzMjI4YiIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.XgM4V5iYjAW5JGbXCr04Cl3j6kMQHAqSFHoj2GSgx08"
                    },
                    body: JSON.stringify(data)
                })
                const list = await res.json()
                changeTodos(list)
            } else {
                console.log("Ce nom existe déjà")
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Nom de la tache</label>
            <input ref={register} style={{ margin: "0 5px"}} name="name" type="text"/>
            <button style={{ margin: "0 5px"}}>Ajouter la tâche</button>
        </form>
    )
}
