import React, { useState } from 'react';
import axios from 'axios'; // Import axios to make a POST request to your backend
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
const ContactForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new review object from the form data
    const newReview = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    // Make a POST request to your backend to create a new review
    axios
      .post('http://localhost:5555/reviews', newReview) // Replace with your backend API endpoint
      .then(() => {
        // Handle success, e.g., show a success message or redirect to a thank you page
        enqueueSnackbar('Review sent succcessfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error('Error creating review:', error);
      });
  };

  return (
    <>
      <div className="col-span-1">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Submit Review
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
