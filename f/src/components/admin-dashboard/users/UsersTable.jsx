import React from 'react';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

const UsersTable = ({ users }) => {
  
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>No</th>
          <th className='border border-slate-600 rounded-md'>Email</th>
          <th className='border border-slate-600 rounded-md'>Business Name</th>
          <th className='border border-slate-600 rounded-md'>Main Branch Location</th>
          <th className='border border-slate-600 rounded-md'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {user.email}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {user.location.businessName}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {user.location.mainBranchLocation}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
              <Link to={`/Admin/users/details/${user._id}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/Admin/users/edit/${user._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/Admin/users/delete/${user._id}`}>
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

export default UsersTable;
