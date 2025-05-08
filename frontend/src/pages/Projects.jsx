import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Navbar } from "../components/Navbar";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    owner: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get(`/api/projects`);
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData((res) => ({ ...res, [e.target.name]: e.target.value }));
  };

  const addProject = async (e) => {
    e.preventDefault();
    if (editProject) {
      const res = await axios.patch(
        `/api/projects/${editProject._id}`,
        formData
      );
      setProjects((prev) =>
        prev.map((p) => (p._id === editProject._id ? res.data : p))
      );
      setEditProject(false);
    } else {
      const res = await axios.post(`/api/projects/create`, formData);
      setProjects((prev) => [...prev, res.data]);
    }
    setFormData({
      title: "",
      description: "",
      owner: "",
    });
    setShowModal(false);
  };

  const handleEditProject = (project) => {
    setEditProject(project);
    setFormData({
      title: project.title || "",
      description: project.description || "",
      owner: project.owner || "",
    });
    setShowModal(true);
  };

  const initializeFormData = () => {
    setFormData({
      title: "",
      description: "",
      owner: "",
    });
    setShowModal(true);
  };

  const deleteProject = async (projectId) => {
    await axios.delete(`/api/projects/${projectId}`);
    setProjects((prev) => prev.filter((p) => p._id !== projectId));
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
          </div>
          <button
            onClick={() => initializeFormData(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-colors"
          >
            Add Project
          </button>
        </div>

        <div className="space-y-4">
          {projects.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No projects found. Create your first project!
            </div>
          ) : (
            projects.map((p) => (
              <div
                key={p._id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {p.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-2">
                      {p.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-500 ">
                        Created by: {p.owner}
                      </span>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => navigate(`/projects/${p._id}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium mb-5 px-4 py-2 rounded-lg transition-colors"
                    >
                      View Tasks
                    </button>
                    <div className="flex justify-around gap-4">
                      <button
                        onClick={() => handleEditProject(p)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Edit"
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="h-4 w-4"
                        />
                      </button>
                      <button
                        onClick={() => deleteProject(p._id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete"
                      >
                        {" "}
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="h-4 pr-0 w-4"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Project Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {editProject ? "Edit Project" : "Add Project"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
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

              <form onSubmit={addProject} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter project title"
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
                    placeholder="Enter project description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner
                  </label>
                  <input
                    type="text"
                    name="owner"
                    placeholder="Enter owner name"
                    value={formData.owner}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  >
                    {editProject ? "Update Project" : "Add Project"}
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
