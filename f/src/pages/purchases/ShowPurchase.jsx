import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

const ShowPurchase = () => {
  const [purchase, setPurchase] = useState({});
  const [loading, setLoading] = useState(false);
  const { id ,pid} = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/purchases/${pid}`)
      .then((response) => {
        setPurchase(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Purchase</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-1/2 p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{purchase._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Product</span>
            <span>{purchase.product}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Quantity</span>
            <span>{purchase.quantity}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Cost Per Unit:</span>
            <span>{purchase.pricePerUnit}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Total Expense</span>
            <span>{purchase.totalPurchasePrice}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Supplier</span>
            <span>{purchase.supplier}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Purchase Date</span>
            <span>{new Date(purchase.purchaseDate).toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowPurchase;
