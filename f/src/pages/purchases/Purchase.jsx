import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import PurchasesTable from '../../components/purchases/PurchasesTable';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const user={user:id};
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/purchases/`,{params:user})
      .then((response) => {
        setPurchases(response.data.data);
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
        <h1 className='text-3xl my-8'>Purchases</h1>
        <Link to={`/dashboard/${id}/purchases/create`}>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? 
        <Spinner /> : <PurchasesTable purchases={purchases} />
      }
    </div>
  );
};

export default Purchase;
