import React,{useState,useEffect} from 'react';
import {useParams } from 'react-router-dom';
import axios from 'axios';


const TP = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    const user =id;
    const [products, setProducts] = useState([]);
    useEffect(() => {
      setLoading(true);
      axios
        .get(`http://localhost:5555/dashboard/topproducts/${user}`,)
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, []);
  
    return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>Name</th>
          <th className='border border-slate-600 rounded-md'>Price</th>
          <th className='border border-slate-600 rounded-md'>Quantity On Hand</th>
          <th className='border border-slate-600 rounded-md'>Sales</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {product.name}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {product.price}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {product.quantityOnHand}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {product.sales}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TP;
