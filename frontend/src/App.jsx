import { useState } from "react";
import taskServices from "./services/service";
import "./App.css";

function App() {
  const [inputVal, setInputVal] = useState("");
  

  const addTask =async () => {
    if (inputVal.trim() === "") return;

    const tasks = await taskServices.addTask(inputVal);
    console.log("Response", tasks);

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
          <div className="todo-task">
            <span>task 1</span>
          </div>
        </div>
        <div className="inProgress">
          <h1>In Progress</h1>
          <div className="inProgress-task">
            <span>task 1</span>
          </div>
        </div>
        <div className="done">
          <h1>Done</h1>
          <div className="done-task">
            <span>task 1</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
