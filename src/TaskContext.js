import React, { useState, createContext } from "react";

export const TaskContext = createContext();

export const TaskProvider = (props) => {
    const [tasks, setTasks] = useState([
        {
            id: "todo-0",
            action: "Vacuum",
            completed: true
        },
        {
            id: "td-1",
            action: "Learn More Code",
            completed: false
        },
        {
            id: 2,
            action: "Build ToDo List Project",
            completed: false
        },
        {
            id: 3,
            action: "Netflix",
            completed: false
        },
        {
            id: 4,
            action: "Chills",
            completed: false
        }
    ]);

    return (
        <TaskContext.Provider value={[tasks, setTasks]}>
            {props.children}
        </TaskContext.Provider>
    );
}