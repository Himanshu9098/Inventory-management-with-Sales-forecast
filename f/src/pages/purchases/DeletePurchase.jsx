import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeletePurchase = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id ,pid} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeletePurchase = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/purchases/${pid}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Purchase Deleted successfully', { variant: 'success' });
        navigate(-1);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Purchase</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this purchase?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeletePurchase}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
}

export default DeletePurchase;
