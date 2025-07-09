import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const RS = () => {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const [sales, setSales] = useState([]);

  useEffect(() => {
    setLoading(true);
    console.log(id)
    axios
      .get(`http://localhost:5555/dashboard/RS/${id}`)
      .then((response) => {
        
        setSales(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">Sale Date</th>
          <th className="border border-slate-600 rounded-md">Total Price</th>
          <th className="border border-slate-600 rounded-md">Customer</th>
          <th className="border border-slate-600 rounded-md">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((sale) => (
          <tr key={sale._id} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">
              {new Date(sale.saleDate).toLocaleDateString()}
            </td>

            <td className="border border-slate-700 rounded-md text-center">
              ${sale.totalSellingPrice}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {sale.customer}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/dashboard/${id}/sales/details/${sale._id}`}>
                  <BsInfoCircle className="text-2xl text-green-800" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RS;
