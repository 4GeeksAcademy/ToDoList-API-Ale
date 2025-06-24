import { useEffect, useState } from "react";

export const TodoList = () => {

    const [tasks, setTasks] = useState([]);
    const [newTasks, setNewTasks] = useState("")

    const getUser = async () => {
        const response = await fetch("https://playground.4geeks.com/todo/users/AleGuilarte");
        const data = await response.json();
        setTasks(data.todos)
        console.log(data)
    }
    useEffect(() => {
        getUser();
    }, [])

    //PARA NO REFESCAR LA PAGINA CADA VEZ QUE SUBO UNA NUEVA TAREA
    const handleSubmit = async (e) => {
        e.preventDefault();

        // PARA NO CARGAR TAREAS VACIAS
        if (newTasks.trim() === "") return;

        const newTask = {
            label: newTasks,
            done: false
        };

        const response = await fetch("https://playground.4geeks.com/todo/todos/AleGuilarte", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        });

        if (response.ok) {
            setNewTasks("");
            getUser(); // LLAMA DE NUEVO A LA FUNCION
        }
    };

    const deletetask = async (id) => {
         await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE",
        });
        getUser()
    }


    return (
        <div>
            <h1>ToDo List</h1>
            <form className="p-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="tarea" className="form-label">Tareas Pendientes</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tarea"
                        placeholder="Comprar cafe y azucar."
                        value={newTasks}
                        onChange={(e) => setNewTasks(e.target.value)}
                    />
                    <div className="form-text">Que tareas quieres recordar?</div>
                </div>

                <button type="submit" className="btn btn-primary">Agregar</button>
            </form>

            <ul>
                {tasks.map((task, index) =>
                    <li className="fs-4" key={index}>{task.label}<button className="btn btn-danger delete" onClick={()=> deletetask(task.id)}>X</button></li>
                )}
            </ul>
        </div>
    )
}