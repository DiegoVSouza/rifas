import './RaffleView.css'
import { Box } from "@chakra-ui/react";
import TittleBox from '../../Components/TittleBox/TittleBox';
import RaffleComponent from '../../Components/RaffleComponent/RaffleComponent';
import ProductHolder from '../../Components/RaffleHolder/RaffleHolder';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../Components/Notification/LoadingSpinner';
import { useShopCar } from '../../../main/hooks/useShopCar';
import { RaffleModel } from '../../../main/hooks/useRaffleModel';

export default function RaffleView() {
  const { Raffle } = RaffleModel()
  const { raffle_id } = useShopCar()

  return (
    <main>
      {Raffle && <RaffleComponent raffle={Raffle} />}
    </main>
  );
}
