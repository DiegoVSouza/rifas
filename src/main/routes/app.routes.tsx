import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeView from '../../Presentation/Pages/Home/HomeView';
import RaffleView from '../../Presentation/Pages/Raffle/RaffleView';
import Admin from '../../Presentation/Pages/Admin/Admin';
import { AdminRouteChecker } from './AdminRouteChecker';
import WinnersView from '../../Presentation/Pages/Winners/WinnersView';

const Router: React.FC = ()=> {
  return (
    <Routes>
      <Route path='/home/' element={<HomeView/>}/>
      <Route path='/' element={<HomeView/>}/>
      <Route path='/rifa/:productname' element={<RaffleView />} />
      <Route path='/admin/' element={<AdminRouteChecker/>}/>
      <Route path='/winners/' element={<WinnersView/>}/>
    </Routes>
  );
}

export default Router;
