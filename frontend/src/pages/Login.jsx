import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error,setError] = useState("");

  const handleSumbit = async (e) => {
  e.preventDefault();

  if (!userName || !password) {
    setError("Username and password are required.");
    return;
  }

  try {
    const response = await axios.post(`/api/auth/login`, {
      username: userName,
      password: password,
    });

    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/projects");
    } else {
      setError("Invalid User");
    }
  } catch (err) {
    if (err.response?.data?.message) {
      setError(err.response.data.message);
    } else {
      setError("Error While Logging in.");
    }
    console.error("Login error:", err);
  }
};

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-[400px] text-center p-2 h-max px-4">
          <Heading label={"Log in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            type="email"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="Email/Mobile"
            label={"Username"}
          />
          <InputBox
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="******"
            label={"Password"}
          />
          {error && (<p className="text-red-800 text-left font-semibold text-sm mt-2">{error}</p>)}
          <div className="pt-4">
            <Button onClick={handleSumbit} label={"Login"} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            link={"Signup"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
