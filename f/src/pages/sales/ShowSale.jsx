import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShowSale = () => {
  const [sale, setSale] = useState({});
  const [loading, setLoading] = useState(false);
  const { id,sid } = useParams();

  useEffect(() => {
    setLoading(true);
    // Fetch the sale data by ID
    axios
      .get(`http://localhost:5555/sales/${sid}`)
      .then((response) => {
        setSale(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Sale</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-1/2 p-4'>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Customer</span>
          <span>{sale.customer}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Sale Date</span>
          <span>{new Date(sale.saleDate).toLocaleDateString()}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl text-gray-500'>Products</span>
        </div>
        {sale.products && sale.products.length > 0 ? (
          <ol>
            {sale.products.map((product, index) => (
              
              <li key={index}>
                <div>{index+1}</div>
                <div className='my-2'>
                  <span className='mr-2 text-gray-500'>Product:</span>
                  <span>{product.product}</span>
                </div>
                <div className='my-2'>
                  <span className='mr-2 text-gray-500'>Quantity:</span>
                  <span>{product.quantity}</span>
                </div>
                <div className='my-2'>
                  <span className='mr-2 text-gray-500'>Price:</span>
                  <span>{product.price}</span>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p>No products available for this sale.</p>
        )}
      </div>
    </div>
  );
};

export default ShowSale;
