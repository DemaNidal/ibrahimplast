import React, { useState } from "react";
 import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
   const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
     console.log(password);
      console.log(username);
    try {
      const data = await login(username, password);
      console.log(data);
      if (data.token) {
        sessionStorage.setItem("user-token", data.token);

        navigate("/",{ replace: true });  
      }
    } catch (error) {
    console.log("error", error);
    }
  };
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <div className="text-center mb-4">
          <img
            src="/logo192.png"
            alt="Al Ibrahem Plast"
            style={{ width: "200px" }}
          />
          <h4 className="mt-3">تسجيل الدخول</h4>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              اسم المستخدم
            </label>
            <input
              id="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="أدخل اسم المستخدم"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" >
            دخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
