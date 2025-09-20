import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import api from '../config/api'; 
import { logout } from '../services/authService';

const Dashboard = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('')
  const [name,setName] = useState('')
  axios.defaults.withCredentials = true;

  useEffect(()=> {
    api.get('/')
    .then(res => {
      if(res.data.Status === "Success") {
        console.log("trueeeeeee")
        setAuth(true)
        setName(res.data.username)
      } else {
                console.log("falseeeeeeeee")
          
        setAuth(false)
        setMessage(res.data.Error)
        navigate('/login'); 
      }
    })
  }, [navigate])

  const handleDelete = async () => {
  try {
    const res = await logout();

    if (res.Status === "Success") {
      // Clear old storage-based tokens
    
      sessionStorage.removeItem("user-token");

      window.location.href = "/login"; // redirect
    }
  } catch (error) {
    console.error("Logout failed", error);
  }
};

  return (
    <div className='container mt-4'>
      {
        auth ?
        <div>
          <h3>You are Authorized {name}</h3>
          <button className='btn btn-danger' onClick={handleDelete} >Logout</button>
          
        </div>
        :
        <div>
          <h3>{message}</h3>
          <h3>login</h3>
          <Link to="/login">LOGIN</Link>

        </div>

      }

    </div>
  );
};

export default Dashboard;
