import { useState } from 'react';
import { Raffle } from '../../../Domain/Model/Raffle';
import './RaffleCard.css'
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import ButtonComponent from '../Inputs/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { IoMdShare } from "react-icons/io";
import { LuArrowLeftRight } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import formatCurrency from '../../../utils/FormatCurrency';
import TruncatedText from '../Inputs/TruncatedText';
import RaffleModel from '../../../main/models/RafflesModel';
import { useShopCar } from '../../../main/hooks/useShopCar';
import RaffleButton from '../Inputs/RaffleButton';

interface RaffleCardInterface {
    raffle: Raffle;
}

export default function RaffleCard({ raffle }: RaffleCardInterface) {
    const [isHover, setIsHover] = useState(false)
    const { onChangeValue } = RaffleModel()
    const { setRaffleId } = useShopCar()
    const history = useNavigate()
    const goToRafflePage = () => {
        setRaffleId(raffle.id)
        history(`/home/shop/${raffle.title.split(' ').join('-').toLocaleLowerCase()}`)
    }
 
    return (
        <Flex direction={'column'} textAlign='left' w={'18rem'} className='raffle-card' position='relative'
             >
            <Text cursor='pointer' onClick={() => goToRafflePage()}  fontSize='2rem' fontWeight='bold' textOverflow={'ellipsis'}
             textAlign='center'>{raffle.title}</Text>
            <Text cursor='pointer' fontSize='1rem' mb='0.5rem'
                fontWeight='regular'>DISPONÍVEIS: {Number(raffle.free)}</Text>
            <Image w={'100%'} height='19rem' src={raffle.imageUrl} />
            <Box padding='1rem 0 2rem 1rem' gap='0.5rem' overflow='hidden'>
                <Text fontSize='2.5rem' fontWeight='bold'>{formatCurrency(raffle.price)}</Text>
            </Box>
            <RaffleButton full={false} width='12.5rem' labelName="Números" onClick={() => goToRafflePage()} />
        </Flex>
    );
}
