import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export const ProjectTasks = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  useEffect(() => {
    axios
      .get(`/api/projects/projectInfo/${projectId}`)
      .then((res) => setProject(res.data[0]));
    axios
      .get(`/api/projects/${projectId}/tasks`)
      .then((res) => setTasks(res.data));
  }, [projectId]);

  const filteredTasks = tasks.filter((t) => {
    return (
      (status === "All" || t.status === status) &&
      (priority === "All" || t.priority === priority)
    );
  });

  const updateTaskStatus = (taskId, status) => {
    axios
      .patch(`/api/projects/${projectId}/tasks/${taskId}`, { status })
      .then((res) => {
        setTasks((prev) => prev.map((t) => (t._id === taskId ? res.data : t)));
      });
  };

  const handleChange = (e) => {
    setFormData((res) => ({ ...res, [e.target.name]: e.target.value }));
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (editTask) {
      const res = await axios.patch(
        `/api/projects/${projectId}/tasks/${editTask._id}`,
        formData
      );
      setTasks((prev) =>
        prev.map((t) => (t._id === editTask._id ? res.data : t))
      );
      setEditTask(false);
    } else {
      const res = await axios.post(
        `/api/projects/${projectId}/tasks/create`,
        formData
      );
      setTasks((prev) => [...prev, res.data]);
    }
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
    });
    setShowModal(false);
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setFormData({
      title: task.title || "",
      description: task.description || "",
      priority: task.priority || "Medium",
      dueDate: task.dueDate?.slice(0, 10) || "",
    });
    setShowModal(true);
  };

  const initializeFormData = () => {
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
    });
    setShowModal(true);
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`/api/projects/${projectId}/tasks/${taskId}`);
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
  };

  const statusClasses = {
    Completed: "bg-green-100 text-green-800",
    Pending: "bg-blue-100 text-blue-800",
  };

  const priorityClasses = {
    High: "bg-red-100 text-red-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Low: "bg-green-100 text-green-800",
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify mb-6">
          <div className="mt-3 mr-3 p-1 cursor-pointer">
            <svg
              onClick={() => navigate("/projects")}
              className="w-4 h-4 text-gray-800 dark:text"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 8 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
              />
            </svg>
          </div>
          <div className="flex justify-between w-full">
            <div className="w-3/4">
              <h1 className="text-2xl font-bold text-gray-800 m-2">
                {project?.title}
              </h1>
              <p className="text-gray-600">{project?.description}</p>
            </div>
            <div className="mt-3">
              <button
                onClick={() => initializeFormData()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-colors"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex gap-4 mb-6">
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div className="relative">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Task Cards */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No tasks found matching your filters
            </div>
          ) : (
            filteredTasks.map((t) => (
              <div
                key={t._id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          priorityClasses[t.priority]
                        }`}
                      >
                        {t.priority}
                      </span>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {t.title}
                      </h2>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {t.description}
                    </p>
                    <div className="mt-3 flex items-center gap-4">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          statusClasses[t.status]
                        }`}
                      >
                        {t.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        Due: {new Date(t.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditTask(t)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Edit"
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="h-4 w-4"
                        />
                      </button>
                      <button
                        onClick={() => deleteTask(t._id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex gap-2 mt-2">
                      {t.status !== "Completed" && (
                        <button
                          onClick={() => updateTaskStatus(t._id, "Completed")}
                          className="text-xs bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded transition-colors border-2 border-solid border-green-400 shadow-md"
                        >
                          Mark Complete
                        </button>
                      )}
                      {t.status !== "Pending" && (
                        <button
                          onClick={() => updateTaskStatus(t._id, "Pending")}
                          className="text-xs bg-gray-100 solid hover:bg-gray-200 text-gray-800 px-2 py-1 rounded transition-colors border-2 border-solid border-current shadow-md"
                        >
                          Re open
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Form */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {editTask ? "Edit Task" : "Add New Task"}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditTask(false);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={addTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter task title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Enter task description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditTask(false);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  >
                    {editTask ? "Update Task" : "Add Task"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
