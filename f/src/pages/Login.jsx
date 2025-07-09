import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5555/users/login', formData);
      if (response.status === 200) {
        if (response.data.role === 'user') {
          navigate(`/dashboard/${response.data.id}`);
        }
          if (response.data.role === 'admin') {
            navigate(`/Admin`);
          }
          enqueueSnackbar(response.data.message, { variant: 'success' });
        

      }
    } catch (error) {
      if (error.response) {
        // Handle the error response here
        const status = error.response.status;
        if (status === 400) {
          enqueueSnackbar('Error: Fill all details', { variant: 'error' });
        }
        if (status === 401) {
          enqueueSnackbar('Error: Invalid username or password', { variant: 'error' });
        }
      } else {
        // Handle other types of errors (e.g., network issues)
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form className="w-72" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Your username or email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Your password"
          />
        </div>
        <button className="bg-blue-500 text-white p-2 rounded w-full mb-4">
          Sign In
        </button>

        <div className="flex justify-center space-x-2">
          Don't have an account?
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
