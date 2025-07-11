import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const ProductsTable = ({ products }) => {
  const {id}= useParams();
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>No</th>
          <th className='border border-slate-600 rounded-md'>Name</th>
          <th className='border border-slate-600 rounded-md'>Description</th>
          <th className='border border-slate-600 rounded-md'>Price</th>
          <th className='border border-slate-600 rounded-md'>Quantity</th>
          <th className='border border-slate-600 rounded-md'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {product.name}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {product.description}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {product.price}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {product.quantityOnHand}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/dashboard/${id}/products/details/${product._id}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/dashboard/${id}/products/edit/${product._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/dashboard/${id}/products/delete/${product._id}`}>
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

export default ProductsTable;
