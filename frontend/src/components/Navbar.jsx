import { Link, useNavigate } from "react-router-dom";

export const Navbar=()=> {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="flex justify-between p-4 shadow">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <div>
        <Link to="/dashboard" className="mr-4">Dashboard</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;