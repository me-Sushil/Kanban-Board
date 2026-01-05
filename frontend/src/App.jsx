import { useEffect, useState } from "react";
import taskServices from "./services/service";
import "./App.css";

function App() {
  const [inputVal, setInputVal] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const allTask = await taskServices.getTask();
        setTasks(allTask);
        console.log(allTask, "this is all task");
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (inputVal.trim() === "") return;

    const tasks = await taskServices.addTask(inputVal);
    console.log("Response", tasks);
    setTasks((prevTasks) => [...prevTasks, tasks]);
    setInputVal("");
  };
  return (
    <>
      <div className="kanban">
        <h1>Kanban Board</h1>
        <div className="input">
          <input
            placeholder="Add Task"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>
      </div>

      <div className="board">
        <div className="todo">
          <h1>To Do</h1>
          {tasks
            .filter((task) => task.status === "todo")
            .map((task) => (
              <div className="todo-task" key={task._id}>
                <span className="task-text">{task.task}</span>
                <div className="task-buttons">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
        </div>
        <div className="inProgress">
          <h1>In Progress</h1>
          {tasks
            .filter((task) => task.status === "in-progress")
            .map((task) => (
              <div className="inProgress-task" key={task._id}>
                <span className="task-text">{task.task}</span>
                <div className="task-buttons">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
        </div>
        <div className="done">
          <h1>Done</h1>
          {tasks
            .filter((task) => task.status === "done")
            .map((task) => (
              <div className="done-task" key={task._id}>
                <span className="task-text">{task.task}</span>
                <div className="task-buttons">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
