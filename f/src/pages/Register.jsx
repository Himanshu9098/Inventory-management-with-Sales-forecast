import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Register = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    location: {
      businessName: '', // Corrected to 'businessName'
      mainBranchLocation: '', // Corrected to 'mainBranchLocation'
    },
  });

  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    numbers: false,
    match: false,
  });

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPasswordValid({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
      match: password === formData.confirmPassword,
    });

    setFormData({ ...formData, password });
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setPasswordValid((prev) => ({ ...prev, match: confirmPassword === formData.password }));

    setFormData({ ...formData, confirmPassword });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the registration data to the server
    axios
      .post('http://localhost:5555/users/register', formData)
      .then(() => {
        enqueueSnackbar('User Created successfully', { variant: 'success' });
        navigate(-1);
      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-semibold mb-4">Registration</h2>
      <form className="w-144" onSubmit={handleSubmit}>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Your email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Business Name</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Your business name"
                onChange={(e) => setFormData({ ...formData, location: { ...formData.location, businessName: e.target.value } })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Main Branch Location</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Your main branch location"
                onChange={(e) => setFormData({ ...formData, location: { ...formData.location, mainBranchLocation: e.target.value } })}
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Your password"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Confirm your password"
                onChange={handleConfirmPasswordChange}
              />
            </div>
            <div className="text-sm mb-4">
              Password must have at least 6 characters, uppercase, lowercase, and numbers.
            </div>
            <div className="text-sm mb-4">
              Password must have at least 6 characters, uppercase, lowercase, and numbers.
            </div>
            <div className={`text-sm ${passwordValid.length ? 'text-success' : 'text-danger'}`}>
              {passwordValid.length ? '✅ At least 6 characters' : '❌ At least 6 characters'}
            </div>
            <div className={`text-sm ${passwordValid.uppercase ? 'text-success' : 'text-danger'}`}>
              {passwordValid.uppercase ? '✅ Contains uppercase letters' : '❌ Contains uppercase letters'}
            </div>
            <div className={`text-sm ${passwordValid.lowercase ? 'text-success' : 'text-danger'}`}>
              {passwordValid.lowercase ? '✅ Contains lowercase letters' : '❌ Contains lowercase letters'}
            </div>
            <div className={`text-sm ${passwordValid.numbers ? 'text-success' : 'text-danger'}`}>
              {passwordValid.numbers ? '✅ Contains numbers' : '❌ Contains numbers'}
            </div>
            <div className={`text-sm ${passwordValid.match ? 'text-success' : 'text-danger'}`}>
              {passwordValid.match ? '✅ Passwords match' : '❌ Passwords do not match'}
            </div>
          </div>
        </div>
        <div className="mt-3 p-4 text-center">
          <button className="bg-blue-500 text-white p-2 rounded w-full mb-4">
            Register
          </button>
        </div>
        <div className="flex justify-center space-x-2">
          Already have an account? <Link to="/Login"><span className="text-blue-500">Login</span></Link>.
        </div>
      </form>
    </div>
  );
};

export default Register;
