import {useNavigate} from "react-router-dom";

const navigate = useNavigate();

export const ProtectedRoute=({Component})=>{
    const token = localStorage.getItem("token");
    return token ? <Component/> : navigate("/login");
}