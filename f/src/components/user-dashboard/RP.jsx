import React,{useState,useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import axios from 'axios';

const RP = () => {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const user =id;
  const [purchases, setPurchases] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/dashboard/RP/${user}`,)
      .then((response) => {
        setPurchases(response.data);
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
          <th className='border border-slate-600 rounded-md'>Purchase Date</th>
          <th className='border border-slate-600 rounded-md'>Total Expense</th>
          <th className='border border-slate-600 rounded-md'>Supplier</th>
          <th className='border border-slate-600 rounded-md'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {purchases.map((purchase) => (
          <tr key={purchase._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {new Date(purchase.purchaseDate).toLocaleDateString()}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {purchase.totalPurchasePrice}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {purchase.supplier}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
            <div className="flex justify-center gap-x-4">

              <Link to={`/dashboard/${id}/purchases/details/${purchase._id}`}>
                <BsInfoCircle className='text-2xl text-green-800' />
              </Link>
            </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RP;
