import React from 'react';
import { useNavigate } from 'react-router-dom';
const Navbar = ({ username, profileImage, onLogout }) => {
  const navigate =useNavigate();
  return (
    <div className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 overflow-hidden">
          <img
            src={profileImage}  // Replace with the actual URL of the user's profile image
            alt="User Profile"
          />
        </div>
        <span className="text-white ml-2">{username}</span>
      </div>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        onClick={()=>{navigate(-1)}}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
