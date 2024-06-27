import './HomeView.css'
import { Box, Image, Text } from "@chakra-ui/react";
import ProductHolder from "../../Components/ProductHolder/RaffleHolder";
import Features from "../../Components/Features/Features";
import home from '../../assets/images/home.png'
import ButtonComponent from '../../Components/Inputs/ButtonComponent';
import { useNavigate } from 'react-router-dom';
export default function HomeView() {
  const history = useNavigate()
  const goToRaffles = () => {
    history('/home/')
    setTimeout(() => window.location.hash = `#raffles`, 100)
}


  return (
    <main>
      <Box height='22rem'  position='relative'>
        <Box w='100%' height='100%' id='overlay-home' position='absolute'></Box>
        <Image className="home-image" src={home}/>
        <Box className='text-box' padding={['5.25rem 1rem','5.25rem 2rem','5.25rem 2rem','5.25rem 3.5rem','5.25rem 3.5rem']} w={['70%','70%','60%','50%','50%']}  height='100%' zIndex={2}>
          <Text fontWeight='medium' 
          fontSize='2rem' className='text-yellow'>SÓ QUEM TEM</Text>
          <Text fontWeight='regular' color={'white'} fontSize='1.5rem' mb='2rem'>REALIZE SEUS SEUS SONHOS!</Text>
          <ButtonComponent onClick={()=>goToRaffles()} labelName='Ver Rifas' full width='80%'/>
        </Box>
      </Box>
      <Features  />
      <ProductHolder discount={true} isnew={false} goDirectForShop={true} title='Rifas' limit={8} pagination={false}/>
    </main>
  );  
}
