import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';

const CreateProduct = () => {
  const { id } = useParams();
  const user =id;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantityOnHand, setQuantityOnHand] = useState('');
  const [categories, setCategories] = useState(''); // State to store selected categories
  const [loading, setLoading] = useState(false);
  
  const sales = 0;
  const { enqueueSnackbar } = useSnackbar();

  const goBack = () => {
    window.history.back();
  };

  const handleSaveProduct = () => {
    const formData = {
      user,
      name,
      description,
      price,
      quantityOnHand,
      categories: categories,
      sales,
    };

    setLoading(true);
    axios
      .post('http://localhost:5555/products/', formData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Product Created successfully', { variant: 'success' });
        goBack();
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
      <h1 className='text-3xl my-4'>Create Product</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            required
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Description</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            required
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Price</label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            required
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Quantity on Hand</label>
          <input
            type='number'
            value={quantityOnHand}
            onChange={(e) => setQuantityOnHand(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            required
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Categories (comma-separated)</label>
          <input
            type='text'
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            required
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveProduct}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateProduct;
