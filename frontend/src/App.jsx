import { useEffect, useState } from "react";
import taskServices from "./services/service";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

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

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    if (sourceStatus !== destStatus) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === draggableId ? { ...task, status: destStatus } : task
        )
      );

      try {
        await taskServices.updateTask(draggableId, { status: destStatus });
        console.log(`Task moved to ${destStatus}`);
      } catch (error) {
        console.error("Failed to update task status:", error);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === draggableId ? { ...task, status: sourceStatus } : task
          )
        );
      }
    }
    
  };

  const renderTask = (task, index) => (

    <Draggable key={task._id} draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${
            task.status === "todo"
              ? "todo-task"
              : task.status === "in-progress"
              ? "inProgress-task"
              : "done-task"
          } ${snapshot.isDragging ? "is-dragging" : ""}`}
        >
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
      )}
    </Draggable>
  );

  const renderColumn = (title, status, colorClass) => {
    const filteredTasks = tasks.filter((task) => task.status === status);

    return (
      <div className={colorClass}>
        <h1>{title}</h1>
        <Droppable droppableId={status}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`column-content ${
                snapshot.isDraggingOver ? "is-dragging-over" : ""
              }`}
            >
              {filteredTasks.map((task, index) => renderTask(task, index))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
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
            // Add keyboard shortcut: Press Enter to add task
            onKeyPress={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />
          <button onClick={addTask}>Add</button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {renderColumn("To Do", "todo", "todo")}
          {renderColumn("In Progress", "in-progress", "inProgress")}
          {renderColumn("Done", "done", "done")}
        </div>
      </DragDropContext>
    </>
  );
}

export default App;
