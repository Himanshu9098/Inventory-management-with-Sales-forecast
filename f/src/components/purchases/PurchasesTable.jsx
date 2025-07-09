import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const PurchasesTable = ({ purchases }) => {
    const {id}=useParams();
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>No</th>
          <th className='border border-slate-600 rounded-md'>Product</th>
          <th className='border border-slate-600 rounded-md'>Quantity</th>
          <th className='border border-slate-600 rounded-md'>Total Expense</th>
          <th className='border border-slate-600 rounded-md'>Supplier</th>
          <th className='border border-slate-600 rounded-md'>Purchase Date</th>
          <th className='border border-slate-600 rounded-md'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {purchases.map((purchase, index) => (
          <tr key={purchase._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <Link to={`/dashboard/${purchase.product}/products/details/${purchase._id}`}>
                {purchase.product}
              </Link>
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {purchase.quantity}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {purchase.totalPurchasePrice}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {purchase.supplier}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
            {new Date(purchase.purchaseDate).toLocaleDateString()}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/dashboard/${id}/purchases/details/${purchase._id}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/dashboard/${id}/purchases/edit/${purchase._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/dashboard/${id}/purchases/delete/${purchase._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PurchasesTable;
