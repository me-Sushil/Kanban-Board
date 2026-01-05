import { useEffect, useState } from "react";
import taskServices from "./services/service";
import "./App.css";

function App() {
  const [inputVal, setInputVal] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedText, setEditedText] = useState("");

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

    const newTask = await taskServices.addTask(inputVal);
    console.log("Response", newTask);
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInputVal("");
  };

  const handleDelete = async (id) => {
    try {
      const res = await taskServices.deleteTask(id);
      console.log(res.message);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditedText(task.task);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedText("");
  };

  const handleSaveEdit = async (id) => {
    if (editedText.trim() === "") return;
    try {
      const updatedTask = await taskServices.updateTask(id, {
        task: editedText,
      });

      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      );

      setEditingTaskId(null);
      setEditedText("");
    } catch (error) {
      console.error("Failed to update task:", error);
    }
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
                {editingTaskId === task._id ? (
                  <>
                    <input
                      className="edit-input"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />
                    <div className="task-buttons">
                      <button
                        className="save-btn"
                        onClick={() => handleSaveEdit(task._id)}
                      >
                        Save
                      </button>
                      <button className="cancel-btn" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="task-text">{task.task}</span>
                    <div className="task-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
        <div className="inProgress">
          <h1>In Progress</h1>
          {tasks
            .filter((task) => task.status === "in-progress")
            .map((task) => (
              <div className="inProgress-task" key={task._id}>
                {editingTaskId === task._id ? (
                  <>
                    <input
                      className="edit-input"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />
                    <div className="task-buttons">
                      <button
                        className="save-btn"
                        onClick={() => handleSaveEdit(task._id)}
                      >
                        Save
                      </button>
                      <button className="cancel-btn" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="task-text">{task.task}</span>
                    <div className="task-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
        <div className="done">
          <h1>Done</h1>
          {tasks
            .filter((task) => task.status === "done")
            .map((task) => (
              <div className="done-task" key={task._id}>
                {editingTaskId === task._id ? (
                  <>
                    <input
                      className="edit-input"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />
                    <div className="task-buttons">
                      <button
                        className="save-btn"
                        onClick={() => handleSaveEdit(task._id)}
                      >
                        Save
                      </button>
                      <button className="cancel-btn" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="task-text">{task.task}</span>
                    <div className="task-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
