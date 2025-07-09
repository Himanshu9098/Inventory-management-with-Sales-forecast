import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import ProductsTable from '../../components/products/ProductsTable';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/products/?user=${id}`)
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton/>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Products List</h1>
        <Link to={`/dashboard/${id}/products/create`}>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? 
        <Spinner /> : <ProductsTable products={products} />
      }
    </div>
  );
};

export default Product;
