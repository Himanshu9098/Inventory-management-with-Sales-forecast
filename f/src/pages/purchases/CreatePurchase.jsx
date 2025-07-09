import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreatePurchase = () => {
  const { id } = useParams();
  const user = id;
  const [product, setProduct] = useState('');
  const [products, setProducts] = useState([]); // Updated to store products
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [supplier, setSupplier] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch the list of available products
    axios.get(`http://localhost:5555/products/?user=${user}`).then((response) => {
      setProducts(response.data.data); // Set products array
    });
  }, [user]);

  const handleSavePurchase = () => {
    const data = {
      user,
      product,
      quantity,
      price,
      supplier,
      purchaseDate,
    };
    setLoading(true);
    axios
      .post(`http://localhost:5555/purchases/`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Purchase Created successfully', { variant: 'success' });
        navigate(-1);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Purchase</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Product</label>
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-1/2"
          >
            <option value="">Select a product</option>
            {products.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Quantity</label>
          <input
            type='number'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Price</label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Supplier</label>
          <input
            type='text'
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Purchase Date</label>
          <input
            type='date'
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSavePurchase}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreatePurchase;
