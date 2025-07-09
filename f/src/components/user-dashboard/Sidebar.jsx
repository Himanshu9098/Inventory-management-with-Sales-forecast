import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { FaCubes, FaMoneyBillWave, FaShoppingCart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
function Sidebar({ isOpen, closeSidebar }) {
  const {id}=useParams();
  const outermostLayerStyle = {
    zIndex: 9999, // You can use a high value like 9999
  };
  const sidebarClasses = `fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transition-transform transform ${
    isOpen ? 'translate-x-0' : '-translate-x-64'
  }`;
  
  return (
    <>
    <div className={sidebarClasses} style={outermostLayerStyle}>
      <div className="p-4 flex flex-col items-left">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <nav className="mt-4">
          <ul className="space-y-4">
            <li className="flex items-center">
              <FaCubes className="mr-2" /> {/* Add an icon */}
              <Link to={`/dashboard/${id}/products`} className="text-white hover:text-blue-500">
                Products
              </Link>
            </li>
            <li className="flex items-center">
              <FaMoneyBillWave className="mr-2" /> {/* Add an icon */}
              <Link to={`/dashboard/${id}/sales`} className="text-white hover:text-blue-500">
                Sales
              </Link>
            </li>
            <li className="flex items-center">
              <FaShoppingCart className="mr-2" /> {/* Add an icon */}
              <Link to={`/dashboard/${id}/purchases`} className="text-white hover:text-blue-500">
                Purchases
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <button className="absolute top-4 right-4 text-white hover:text-red-500" onClick={closeSidebar}>
        X
      </button>
    </div>
    </>
  );
}

export default Sidebar;
