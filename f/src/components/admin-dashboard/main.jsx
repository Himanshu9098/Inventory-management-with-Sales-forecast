import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import ReviewsTable from './reviews/ReviewsTable';
import UsersTable from './users/UsersTable';
const main = () => {
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('user');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/users')
      .then((response) => {
        setUsers(response.data);
        
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    axios
      .get('http://localhost:5555/reviews')
      .then((response) => {
        setReviews(response.data);
        
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
      setLoading(false);
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('user')}
        >
          Users List
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('review')}
        >
          Review
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : showType === 'user' ? (<>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Users List</h1>
          <Link to='/Register'>
            <MdOutlineAddBox className='text-sky-800 text-4xl' />
          </Link>
        </div>
        <UsersTable users={users} />
      </>
      ) : (<>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Reviews</h1>
        </div>
        <ReviewsTable reviews={reviews} />
      </>

      )}
    </div>
  );
};

export default main;
