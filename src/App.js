import React from 'react';
import './App.css';
import Home from './components/home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemDetails from './components/shopDetails/ItemDetails';
import Cart from './components/cart/Cart';
import Signup from './components/Signup';
import Login from './components/Login';
import AddProduct from './components/addProduct/AddProduct';
import ShowProduct from './components/addProduct/ShowProduct';
import CreateCategory from './components/addProduct/CreateCategory';
import CategoryPage from './components/categoryPage/CategoryPage';
import ProtectedRoute from './components/ProtectedRoute';



function App() {
  return (
    <>

      <BrowserRouter>


        <Routes>
          <Route exact path='/' element={<ProtectedRoute Component={Home} />} />
          <Route exact path='/signUp' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/shopDetails' element={<ItemDetails />} />
          <Route exact path='/createCategory' element={<CreateCategory />} />
          <Route exact path='/addProduct' element={<ProtectedRoute Component={AddProduct} />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/categoryPage' element={<ProtectedRoute Component={CategoryPage} />} />
          <Route exact path='/showProduct' element={<ShowProduct />} />
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
