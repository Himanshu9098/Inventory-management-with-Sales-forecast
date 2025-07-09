import React, { useState,useEffect } from 'react';
import Sidebar from '../../components/user-dashboard/Sidebar';
import Navbar from '../../components/Navbar';
import SalesChart from '../../components/user-dashboard/SalesChart';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Expense from '../../components/user-dashboard/Expense';
import Revenue from '../../components/user-dashboard/Revenue';
import RP from '../../components/user-dashboard/RP';
import RS from '../../components/user-dashboard/RS';
import TP from '../../components/user-dashboard/TP';
import ProductCount from '../../components/user-dashboard/ProductCount';


const userDash = ()=> {
  const {id}=useParams();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user,setUser] = useState({
    email: '',
    password: '',
    location: {
      businessName: '',
      mainBranchLocation: '',
    },
  });

  
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5555/users/${id}`,)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='row p-0'>
    <div className="row">  

      <Navbar profileImage={"/assets/Dashboard/user.png"} username={user.location.businessName}/>
      <button onClick={openSidebar} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        =
      </button>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      </div>
      <div className="flex p-4 space-x-2">
         <div className='flex-1'>
          <Expense/>
         </div>
         <div className='flex-1'>
          <Revenue/>
         </div>
         <div className='flex-1'>
          <ProductCount/>
         </div>
      </div>
      {/* <br />
      <br /> */}
      {/* <div className="flex px-10 py-4 items-center content-center">
        <h1>Past 30 days Sales:</h1>
        <SalesChart id={id}/>
      </div> */}
      <br />
      <br />
      <div className="flex p-4 space-x-4">
         <div className='flex-1'>
          <h2>Recent Sales:</h2>
          <RS/>
         </div>
         <div className='flex-1'>
          <h2>Recent Purchases:</h2>
          <RP/>
         </div>
      </div>
      <br />
      <br />
      <div className="flex p-4">
        <h2>Top Products:</h2>
        <TP/>
      </div>
    </div>
  );
}

export default userDash;
