import './WinnersView.css'
import { Box, Image, Text } from "@chakra-ui/react";
import ProductHolder from "../../Components/RaffleHolder/RaffleHolder";
import Features from "../../Components/Features/Features";
import home from '../../assets/images/home.png'
import ButtonComponent from '../../Components/Inputs/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import RaffleHolderWinners from '../../Components/RaffleHolder/RaffleHolderWinners';
export default function WinnersView() {
  const history = useNavigate()
  
  return (
    <main>
      <RaffleHolderWinners  goDirectForShop={true} title='Ultimos Ganhadores' limit={10} pagination={false}/>
    </main>
  );  
}
