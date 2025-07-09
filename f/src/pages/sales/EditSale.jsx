import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditSale = () => {
  const [products, setProducts] = useState([]); // List of available products
  const [productSales, setProductSales] = useState([
    {
      product: '',
      quantity: 0,
      price: 0,
    },
  ]); // Initial product sale item
  const [customer, setCustomer] = useState('');
  const [saleDate, setSaleDate] = useState('');
  const [loading, setLoading] = useState(false);
  const { id,sid } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate =useNavigate();
  useEffect(() => {
    // Fetch the list of available products
    axios.get(`http://localhost:5555/products/?user=${id}`).then((response) => {
      setProducts(response.data.data);
    });

    // Fetch the sale data by ID and update the state
    axios.get(`http://localhost:5555/sales/${sid}`).then((response) => {
      const saleData = response.data;
      setCustomer(saleData.customer);
      setSaleDate(saleData.saleDate);

      const initialProductSales = saleData.products.map((productSale) => {
        return {
          product: productSale.product._id,
          quantity: productSale.quantity,
          price: productSale.price,
        };
      });
      setProductSales(initialProductSales);
    });
  }, [id]);

  const handleProductChange = (index, productId) => {
    const selectedProduct = products.find((product) => product._id === productId);
    if (selectedProduct) {
      const updatedProductSales = [...productSales];
      updatedProductSales[index].product = productId;
      updatedProductSales[index].price = selectedProduct.price;
      setProductSales(updatedProductSales);
    }
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedProductSales = [...productSales];
    updatedProductSales[index].quantity = quantity;
    setProductSales(updatedProductSales);
  };

  const handleAddProduct = () => {
    setProductSales([
      ...productSales,
      {
        product: '',
        quantity: 0,
        price: 0,
      },
    ]);
  };

  const handleRemoveProduct = (index) => {
    const updatedProductSales = [...productSales];
    updatedProductSales.splice(index, 1);
    setProductSales(updatedProductSales);
  };

  const handleEditSale = () => {
    setLoading(true);

    const saleData = {
      products: productSales,
      customer,
      saleDate,
    };

    axios
      .put(`http://localhost:5555/sales/${id}`, saleData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Sale updated successfully', { variant: 'success' });
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
      <h1 className='text-3xl my-4'>Edit Sale</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        {productSales.map((productSale, index) => (
          <div key={index} className='my-4 flex items-center'>
            <label className='text-xl mr-4 text-gray-500'>Product</label>
            <select
              value={productSale.product}
              onChange={(e) => handleProductChange(index, e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-1/2'
            >
              <option value=''>Select a product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
            <label className='text-xl ml-4 mr-4 text-gray-500'>Quantity</label>
            <input
              type='number'
              value={productSale.quantity}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-1/4'
            />
            <button
              className='ml-4 p-2 bg-red-600 text-white'
              onClick={() => handleRemoveProduct(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className='p-2 bg-sky-300 m-4'
          onClick={handleAddProduct}
        >
          Add Product
        </button>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Customer</label>
          <input
            type='text'
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Sale Date</label>
          <input
            type='date'
            value={saleDate}
            onChange={(e) => setSaleDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditSale}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditSale;
