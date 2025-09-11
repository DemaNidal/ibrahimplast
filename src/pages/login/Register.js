import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config/api";
 import { useNavigate } from 'react-router-dom';

function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
   const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Sending values:", values);

    try {
      const res = await axios.post(`${API_URL}/register`, values);
        if(res.status === 201){
            navigate("/login");
        }
    } catch (err) {
      console.error("Register error:", err);
      alert("حدث خطأ أثناء الاتصال بالسيرفر");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>انشاء حساب</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username">
              <strong>الاسم</strong>
            </label>
            <input
              type="text"
              placeholder="ادخل الاسم"
              name="username"
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>البريد الإلكتروني</strong>
            </label>
            <input
              type="email"
              placeholder="ادخل البريد الالكتروني"
              name="email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>كلمة السر</strong>
            </label>
            <input
              type="password"
              placeholder="ادخل كلمة السر"
              name="password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            انشاء الحساب
          </button>
          <p></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
