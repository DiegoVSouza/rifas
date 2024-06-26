import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeView from '../../Presentation/Pages/Home/HomeView';
import UserPage from '../../Presentation/Pages/UserPage/UserPage';
import ProductView from '../../Presentation/Pages/Product/ProductView';

const Router: React.FC = ()=> {
  return (
    <Routes>
      <Route path='/home/' element={<HomeView/>}/>
      <Route path='/home/shop/:productname' element={<ProductView />} />
      <Route path='/userpage/' element={<UserPage/>}/>
    </Routes>
  );
}

export default Router;
