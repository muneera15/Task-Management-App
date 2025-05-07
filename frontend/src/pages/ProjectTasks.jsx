import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export const ProjectTasks = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('All');
  const [priority, setPriority] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editTask,setEditTask]=useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    dueDate: '',
  });

  useEffect(() => {
    axios.get(`/api/projects/projectInfo/${projectId}`).then(res => setProject(res.data[0]));
    axios.get(`/api/projects/${projectId}/tasks`).then(res => setTasks(res.data));
  }, [projectId]);

  const filteredTasks = tasks.filter(t => {
    return (status === 'All' || t.status === status) && (priority === 'All' || t.priority === priority);
  });

  const updateTaskStatus = (taskId, status) => {
    axios.patch(`/api/projects/${projectId}/tasks/${taskId}`, { status }).then(res => {
      setTasks(prev => prev.map(t => (t._id === taskId ? res.data : t)));
    });
  };

  const handleChange = e => {
    setFormData(res => ({ ...res, [e.target.name]: e.target.value }));
  };

  const addTask = async (e) => {
  e.preventDefault();
  if (editTask) {
    const res = await axios.patch(`/api/projects/${projectId}/tasks/${editTask._id}`, formData);
    setTasks(prev => prev.map(t => (t._id === editTask._id ? res.data : t)));
    setEditTask(false);
  } else {
    const res = await axios.post(`/api/projects/${projectId}/tasks/create`, formData);
    setTasks(prev => [...prev, res.data]);
  }
  setFormData({ title: '', description: '', priority: 'Medium', dueDate: '' });
  setShowModal(false);
};


  const handleEditTask = (task) => {
    setEditTask(task); // store the task being edited
    setFormData({
      title: task.title || '',
      description: task.description || '',
      priority: task.priority || 'Medium',
      dueDate: task.dueDate?.slice(0, 10) || '',
    });
    setShowModal(true);
  };
  
  const deleteTask = async (taskId) => {
    await axios.delete(`/api/projects/${projectId}/tasks/${taskId}`);
    setTasks(prev => prev.filter(t => t._id !== taskId));
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <div>
        <h1 className='text-2xl font-semibold'>{project?.title}</h1>
        <p>{project?.description}</p>
        </div>
        <div className='flex'>
          <button onClick={()=>navigate(`/projects/${p._id}`)}  className="bg-blue-600 align-center text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700">
          View Projects
        </button>
        <button onClick={() => setShowModal(true)} className='bg-blue-500 text-white px-4 align-right py-1 rounded'>Add Task</button>
        </div>
      </div>

      {/* Filter controls */}
      <div className='flex gap-4 mb-4'>
        Filter By
        <select value={status} onChange={e => setStatus(e.target.value)} className='border px-2 py-1'>
          <option> All </option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        Sort By 
        <select value={priority} onChange={e => setPriority(e.target.value)} className='border px-2 py-1'>
          <option> All </option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      {/* Task Cards */}
      <div className='space-y-4'>
        {filteredTasks.map(t => (
          <div key={t._id} className='bg-gray-100 p-4 rounded'>
            <div className='flex justify-between'>
              <div>
                <h2 className='text-lg font-semibold mb-2'>{t?.title}</h2>
                <p className='text-sm text-gray-600 mb-4'>{t?.description}</p>
                <p className='text-xs text-gray-600'>Due date: {t.dueDate?.slice(0, 10)}</p>
              </div>
              <div className='text-right'>
                <div className='flep items-center'>
                  <div className={t.priority === "High" ? "bg-red-200" : t.priority === "Medium" ? "bg-yellow-200": "bg-green-200"}> {t.priority} </div>
              <input type='checkBox' checked={t.status === "Completed"} onChange={(event) => updateTaskStatus(t._id, event.target.checked ? "Completed" : "In Progress")} className='text-green-600 text-sm p-2'/>
                <span className={`text-xs px-2 py-1 rounded ${t.status === 'Completed' ? 'bg-green-200' :'bg-yellow-200'}`}>{t.status}</span>
                </div>
                <div className='mt-2 flex gap-4'>
                  <FontAwesomeIcon icon={faPenToSquare} className="cursor-pointer text-black-600" onClick={() => handleEditTask(t)} />
                  <FontAwesomeIcon icon={faTrash} className="cursor-pointer text-black-600" onClick={() => deleteTask(t._id)} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{(editTask) ? "Edit Task" : "Add New Task" }</h2>
            <form onSubmit={addTask} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Task Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {setShowModal(false); setEditTask(false)}}
                  className="px-4 py-2 border rounded text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded">
                  {(editTask) ? "Save" :"Add Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
