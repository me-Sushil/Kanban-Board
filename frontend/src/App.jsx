import "./App.css";

function App() {
  return (
    <>
      <div>
        <h1>Add Task</h1>
        <div>
          <input placeholder="add task" />
          <button>Add</button>
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
