import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(username, password);

      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/');
      }
    } catch (error) {
      alert('خطأ في اسم المستخدم أو كلمة المرور');
    }
  };
  return (
     <div className="container d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <div className="text-center mb-4">
          <img src="/logo192.png" alt="Al Ibrahem Plast" style={{ width: '200px' }} />
          <h4 className="mt-3">تسجيل الدخول</h4>
        </div>
        <form onSubmit={handleLogin} >
          <div className="mb-3">
            <label className="form-label">اسم المستخدم</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">كلمة المرور</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            دخول
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
