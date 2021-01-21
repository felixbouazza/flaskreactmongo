import React from 'react'
import { useForm } from "react-hook-form";

export default function TodoForm({todos, addTodos}) {

    const {register, handleSubmit } = useForm()
    
    const onSubmit = async (data) => {
        if(!data.name) {
            console.log("Aucun nom n'est renseigné")
        } else {
            const newTodos = todos.filter(todo => todo.name === data.name)
            if(newTodos.length === 0) {
                const res = await fetch('/api/todos', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                const obj = await res.json()
                addTodos(obj)
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
