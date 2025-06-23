import { useEffect, useState } from "react";

export const TodoList = () => {
    
            const [tasks, setTasks] = useState ([]);
            const [newTasks, setNewTasks] = useState ("")

            const getUser = async () => {
                const response = await fetch("https://playground.4geeks.com/todo/users/AleGuilarte");
                const data = await response.json();
                setTasks(data.todos)
                console.log(data)
            }
            useEffect(() => {
                getUser();
            }, [])

    return (
        <div>
            <h1>ToDo List</h1>
            <form className= "p-5">
                <div className="mb-3">
                    <label for="tarea" className="form-label">Tareas Pendientes</label>
                    <input 
                    type="text"
                    className="form-control" 
                    id="tarea"
                    placeholder="Comprar cafe y azucar."
                    value={newTasks}
                    />
                    <div className="form-text">Que tareas quieres recordar?</div>
                </div>
            
                <button type="submit" className="btn btn-primary">Agregar</button>
            </form>

            <ul>
                {tasks.map((task, index) => 
                <li className="fs-4" key={index}>{task.label}<button className="btn btn-danger delete">X</button></li>
                )}
            </ul>
        </div>
    )
}