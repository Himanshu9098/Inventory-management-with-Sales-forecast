import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    location: {
      businessName: '',
      mainBranchLocation: '',
    },
  });

  const [passwordValid, setPasswordValid] = useState({
    length: true, // Assuming passwords are not required to be changed in the edit form
    uppercase: true,
    lowercase: true,
    numbers: true,
  });

  useEffect(() => {
    // Fetch the existing user data and populate the form
    axios
      .get(`http://localhost:5555/users/${id}`)
      .then((response) => {
        const userData = response.data;
        setFormData({
          email: userData.email,
          location: {
            businessName: userData.location.businessName,
            mainBranchLocation: userData.location.mainBranchLocation,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPasswordValid({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
    });

    setFormData({ ...formData, password });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the updated user data to the server
    axios
      .put(`http://localhost:5555/users/${id}`, formData)
      .then(() => {
        enqueueSnackbar('User Updated successfully', { variant: 'success' });
        navigate(-1); // Redirect to user details page after edit
      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
      <form className="w-144" onSubmit={handleSubmit}>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Business Name</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Your business name"
                value={formData.location.businessName}
                onChange={(e) => setFormData({ ...formData, location: { ...formData.location, businessName: e.target.value } })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Main Branch Location</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Your main branch location"
                value={formData.location.mainBranchLocation}
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
            <div className="text-sm mb-4">
              Password must have at least 6 characters, uppercase, lowercase, and numbers.
            </div>
            {/* Validation messages */}
          </div>
        </div>
        <div className="mt-3 p-4 text-center">
          <button className="bg-blue-500 text-white p-2 rounded w-full mb-4">
            Save Changes
          </button>
        </div>
        <div className="flex justify-center space-x-2">
          <Link to={`/users/${id}`}>
            <span className="text-blue-500">Cancel</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
