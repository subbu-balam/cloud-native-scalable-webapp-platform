import { useEffect, useState } from "react";
import "./App.css";

const API_BASE_URL = "";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      setMessage("Backend is not reachable. Make sure Spring Boot is running.");
    }
  };

  const createTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setMessage("Task title is required.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task.");
      }

      setTitle("");
      setDescription("");
      setMessage("Task created successfully.");
      fetchTasks();
    } catch (error) {
      setMessage("Failed to create task.");
    }
  };

  const toggleTask = async (task) => {
    try {
      await fetch(`${API_BASE_URL}/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          completed: !task.completed,
        }),
      });

      fetchTasks();
    } catch (error) {
      setMessage("Failed to update task.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        method: "DELETE",
      });

      fetchTasks();
    } catch (error) {
      setMessage("Failed to delete task.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="app-container">
      <section className="card">
        <p className="eyebrow">Cloud-Native Scalable Web App Platform</p>
        <h1>TaskFlow</h1>
        <p className="subtitle">
          Simple task app powered by React and Java Spring Boot.
        </p>

        <form onSubmit={createTask} className="task-form">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <input
            type="text"
            placeholder="Task description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <button type="submit">Add Task</button>
        </form>

        {message && <p className="message">{message}</p>}

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty">No tasks yet. Add your first task.</p>
          ) : (
            tasks.map((task) => (
              <div className="task-item" key={task.id}>
                <div>
                  <h3 className={task.completed ? "done" : ""}>
                    {task.title}
                  </h3>
                  <p>{task.description}</p>
                  <span>{task.completed ? "Completed" : "Pending"}</span>
                </div>

                <div className="task-actions">
                  <button onClick={() => toggleTask(task)}>
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button className="delete" onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default App;