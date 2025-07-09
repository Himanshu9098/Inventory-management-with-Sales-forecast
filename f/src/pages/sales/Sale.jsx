import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import SalesTable from '../../components/sales/SalesTable';
import { useParams } from 'react-router-dom';


const Sale = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const user={user:id};
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/sales/`,{params:user})
      .then((response) => {
        setSales(response.data.data);
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
        <h1 className='text-3xl my-8'>Sale Transactions</h1>
        <Link to={`/dashboard/${id}/sales/create`}>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
  <Spinner />
) : (<>
  <SalesTable sales={sales} user={id} />
  <div className="flex justify-between">
      <button className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md px-4 py-2">
        <Link to={`http://localhost:5555/download/${id}`} target="_blank">
          Download Sales
        </Link>
      </button>
      
      <button className="border border-green-500 text-green-500 hover:text-white hover:bg-green-600 rounded-md px-4 py-2">
        <Link to={`http://localhost:5174/`} target='_blank'>Sales Forecast</Link>
      </button>
    </div></>
)}
    </div>
  );
};

export default Sale;
