import './RaffleView.css'
import { Box } from "@chakra-ui/react";
import TittleBox from '../../Components/TittleBox/TittleBox';
import RaffleComponent from '../../Components/RaffleComponent/RaffleComponent';
import ProductHolder from '../../Components/ProductHolder/RaffleHolder';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../Components/Notification/LoadingSpinner';
import RaffleModel from '../../../main/models/RafflesModel';
import { useShopCar } from '../../../main/hooks/useShopCar';

export default function RaffleView() {
  const { Raffle, getRaffle } = RaffleModel()
  const { raffleId } = useShopCar()

  useEffect(() => {
    getRaffle({ id: raffleId })
  }, [])

  console.log("raffleId",raffleId)
  console.log("Raffle",Raffle)

  return (
    <main>
      {Raffle && <RaffleComponent raffle={Raffle} />}
    </main>
  );
}
