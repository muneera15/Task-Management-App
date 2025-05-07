import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

export const Projects=()=>{
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', owner: '' });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProjects = async() => {
    const res = await axios.get(`/api/projects`)
    setProjects(res.data);
    };
    fetchProjects();
  }, []);
 
  const handleChange = e => {
    setFormData(res => ({ ...res, [e.target.name]: e.target.value }));
  };
  const addProject = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/projects/create`, formData);
      setProjects(prev => [...prev, res.data]);
      setShowModal(false); 
      setFormData({ title: '', description: '', owner: '' });
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };
  
  return (
    <div className="p-4">
      <button onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Project
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
            <form onSubmit={addProject} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Project Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="owner"
                placeholder="Owner Name"
                value={formData.owner}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="mt-6">
        {projects.map(p => (
          <div onClick={()=>navigate(`/projects/${p._id}`)}key={p._id} className="p-4 border rounded mb-3">
            <h3 className="font-bold">{p.title}</h3>
            <p>{p.description}</p>
            <p className="text-sm text-gray-500">Owner: {p.owner}</p>
          </div>
        ))}
      </div>
    </div>
  );
}