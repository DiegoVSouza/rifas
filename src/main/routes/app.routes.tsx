import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeView from '../../Presentation/Pages/Home/HomeView';
import RaffleView from '../../Presentation/Pages/Raffle/RaffleView';
import Admin from '../../Presentation/Pages/Admin/Admin';

const Router: React.FC = ()=> {
  return (
    <Routes>
      <Route path='/home/' element={<HomeView/>}/>
      <Route path='/' element={<HomeView/>}/>
      <Route path='/rifa/:productname' element={<RaffleView />} />
      <Route path='/admin/' element={<Admin/>}/>
    </Routes>
  );
}

export default Router;
