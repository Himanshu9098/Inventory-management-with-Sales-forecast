import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Product from './pages/products/Product';
import DeleteProduct from './pages/products/DeleteProduct'
import ShowProduct from './pages/products/ShowProduct'
import EditProduct from './pages/products/EditProduct'
import CreateProduct from './pages/products/CreateProduct'
import CreateSale from './pages/sales/CreateSale'
import EditSale from './pages/sales/EditSale'
import ShowSale from './pages/sales/ShowSale'
import Sales from './pages/sales/Sale'
import DeleteSale from './pages/sales/DeleteSale'
import CreatePurchase from './pages/purchases/CreatePurchase'
import EditPurchase from './pages/purchases/EditPurchase'
import ShowPurchase from './pages/purchases/ShowPurchase'
import Purchase from './pages/purchases/Purchase'
import DeletePurchase from './pages/purchases/DeletePurchase'

import UserDash from './pages/users/userDash';

import AdminDash from './pages/users/adminDash';
import ShowUser from './components/admin-dashboard/users/ShowUser'
import DeleteUser from './components/admin-dashboard/users/DeleteUser'
import EditUser from './components/admin-dashboard/users/EditUser'
import ShowReview from './components/admin-dashboard/reviews/ShowReview';
import DeleteReview from './components/admin-dashboard/reviews/DeleteReview'; 



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/dashboard/:id' element={<UserDash />} />
      <Route path='/dashboard/:id/products' element={<Product />} />
      <Route path='/dashboard/:id/products/delete/:pid' element={<DeleteProduct />} />
      <Route path='/dashboard/:id/products/create' element={<CreateProduct />} />
      <Route path='/dashboard/:id/products/edit/:pid' element={<EditProduct />} />
      <Route path='/dashboard/:id/products/details/:pid' element={<ShowProduct />} />
      <Route path='/dashboard/:id/sales' element={<Sales />} />
      
      <Route path='/dashboard/:id/sales/create' element={<CreateSale />} />
      <Route path='/dashboard/:id/sales/edit/:sid' element={<EditSale />} />
      <Route path='/dashboard/:id/sales/details/:sid' element={<ShowSale />} />
      <Route path='/dashboard/:id/sales/delete/:sid' element={<DeleteSale />} />
      <Route path='/dashboard/:id/purchases' element={<Purchase />} />
      <Route path='/dashboard/:id/purchases/create' element={<CreatePurchase />} />
      <Route path='/dashboard/:id/purchases/edit/:pid' element={<EditPurchase />} />
      <Route path='/dashboard/:id/purchases/details/:pid' element={<ShowPurchase />} />
      <Route path='/dashboard/:id/purchases/delete/:pid' element={<DeletePurchase />} />
      <Route path='/Admin' element={<AdminDash />} />
      <Route path='/Admin/users/details/:id' element={<ShowUser/>} />
      <Route path='/Admin/users/delete/:id' element={<DeleteUser />} />
      <Route path='/Admin/users/edit/:id' element={<EditUser />} />
      <Route path='/Admin/reviews/details/:id' element={<ShowReview />} />
      <Route path='/Admin/reviews/delete/:id' element={<DeleteReview />} />


    </Routes>
  );
};

export default App;
