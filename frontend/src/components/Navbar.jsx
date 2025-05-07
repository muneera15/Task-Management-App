import { Link, useNavigate } from "react-router-dom";

export const Navbar=()=> {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  function showNavBar() {
    if(localStorage.getItem("token")) {
      return(<div>
      <Link to="/projects" className="mr-4">Projects</Link>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"onClick={(handleLogout)} strokeWidth="1.5" stroke="currentColor" className="cursor-pointer size-6 flex flex-col justify-center h-full  text-rose-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
      </svg>
      </div>)
    }
  }
  return (
    <nav className="flex justify-between p-4 shadow">
      <h1 className="text-2xl font-semibold mb-6">Task Manager</h1>
      {
        showNavBar()
      }

    </nav>
  );
}

export default Navbar;