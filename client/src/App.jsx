import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";

const emptyForm = { title: "", description: "" };

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      setTasks(await getTasks());
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setError("Title is required");
    try {
      if (editingId) {
        await updateTask(editingId, form);
      } else {
        await createTask(form);
      }
      setForm(emptyForm);
      setEditingId(null);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setForm({ title: task.title, description: task.description });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleToggle = async (task) => {
    try {
      await updateTask(task._id, { completed: !task.completed });
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask(id);
      if (editingId === id) handleCancel();
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>MERN CRUD – Task Manager</h1>

      {error && <div className="error">{error}</div>}

      <form className="form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          rows="3"
          value={form.description}
          onChange={handleChange}
        />
        <div className="actions">
          <button type="submit" className="btn primary">
            {editingId ? "Update Task" : "Add Task"}
          </button>
          {editingId && (
            <button type="button" className="btn" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <p className="empty">No tasks yet. Add your first one!</p>
      ) : (
        <ul className="list">
          {tasks.map((task) => (
            <li key={task._id} className={task.completed ? "done" : ""}>
              <div className="info">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task)}
                />
                <div>
                  <strong>{task.title}</strong>
                  {task.description && <p>{task.description}</p>}
                </div>
              </div>
              <div className="actions">
                <button className="btn" onClick={() => handleEdit(task)}>
                  Edit
                </button>
                <button
                  className="btn danger"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
