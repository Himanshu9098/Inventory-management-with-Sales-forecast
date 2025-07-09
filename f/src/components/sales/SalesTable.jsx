import React from 'react';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const SalesTable = ({ sales, user }) => {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">Sale ID</th>
          <th className="border border-slate-600 rounded-md">Customer</th>
          <th className="border border-slate-600 rounded-md">Total Price</th>
          <th className="border border-slate-600 rounded-md">Sale Date</th>
          <th className="border border-slate-600 rounded-md">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((sale,index) => (
          <tr key={sale._id} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">
              {index+1}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {sale.customer}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              ${sale.totalSellingPrice}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {new Date(sale.saleDate).toLocaleDateString()}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/dashboard/${user}/sales/details/${sale._id}`}>
                  <BsInfoCircle className="text-2xl text-green-800" />
                </Link>
                <Link to={`/dashboard/${user}/sales/edit/${sale._id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600" />
                </Link>
                <Link to={`/dashboard/${user}/sales/delete/${sale._id}`}>
                  <AiOutlineDelete className="text-2xl text-red-600" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SalesTable;
