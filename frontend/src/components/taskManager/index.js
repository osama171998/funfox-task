import { useLocation, useNavigate } from 'react-router-dom';
import { mockResponse } from "./mockApi"
import { useEffect, useState } from 'react';
import Swal from "sweetalert2"
import styless from "./style.module.css"
import { useRef } from 'react';
import Header from '../header';
const TaskManager = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [tasks, getTasks] = useState()

    const title = useRef();
    const description = useRef();
    useEffect(() => {
        if (state === null) {
            Swal.fire({
                icon: "error",
                text: "Please Login First"
            })
            navigate("/")

        }
        else {
            const relevantTasks = mockResponse.filter((task) => task.userGroup === state.userGroup)
            getTasks(relevantTasks)
        }
        // eslint-disable-next-line
    }, [state])


    const updateTaskStatus = (taskId, taskStatus) => {
        let taskCopy = tasks
        if (taskStatus === "Delete") {
            taskCopy.splice(taskId, 1)
        }
        else {
            taskCopy[taskId]["status"] = taskStatus
        }
        getTasks([...taskCopy])


    }
    const addNewTask = (e) => {
        e.preventDefault();
        let taskPayload = {
            id: Math.random(),
            title: title.current.value,
            description: description.current.value,
            userGroup: state.userGroup,
            status: "Pending"
        }
        let taskAppend = [...tasks, taskPayload]
        getTasks([...taskAppend])
    }
    return <>

      <Header title="Task Manager"/>

        <div className={styless.taskHolder}>
            {
                tasks && tasks.map((task, index) => {
                    return <div className={styless.taskss} key={task.id}>

                        <ul className={styless.listStyling} >

                            <li>
                                <h3>
                                    {task.title}
                                </h3>
                                <p>
                                    <i>{task.description}</i>
                                </p>
                                <p>
                                    <b>{task.status}</b>
                                </p>
                            </li>


                        </ul>
                        <button className={styless.completeButton} onClick={() => updateTaskStatus(index, "Complete")}>
                            Complete
                        </button>
                        <button className={styless.inCompleteButton} onClick={() => updateTaskStatus(index, "Incomplete")}>
                            Incomplete
                        </button>
                        <button className={styless.deleteButton} onClick={() => updateTaskStatus(index, "Delete")} >
                            Delete
                        </button>
                    </div>
                })
            }
        </div>

        <div className={styless.addNewTaskContaniner}>
            <h1 className={styless.title}>
                Add New Task
            </h1>

            <form onSubmit={addNewTask}>
                <div className={styless.addNewTaskHolder}>
                    <div className={styless.inputHolder}>
                        <label className={styless.labelStyling}>
                            Title:
                        </label>
                        <input type="text" name='taskTitle' required placeholder='Task Title' ref={title} className={styless.inputStyling} />

                    </div>
                    <div className={styless.inputHolder}>
                        <label className={styless.labelStyling}>
                            Description:
                        </label>
                        <input type="text" name='taskDescription' required placeholder='Task Description' ref={description} className={styless.inputStyling} />
                    </div>
    
                    <div  className={styless.inputHolder}>
                        <input type="submit" name='addTask' value="Add" required className={styless.addButton}/>
                    </div>
                </div>
            </form>


        </div>
    </>
}

export default TaskManager