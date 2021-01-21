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
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                const list = await res.json()
                console.log(list)
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
