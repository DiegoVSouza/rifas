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
import { useShopCar } from '../../../main/hooks/useShopCar';
import RaffleButton from '../Inputs/RaffleButton';
import dayjs from 'dayjs';
import { RaffleModel } from '../../../main/hooks/useRaffleModel';

interface RaffleCardInterface {
    user: any;
}

export default function RaffleCardWinners({ user }: RaffleCardInterface) {
    const { onChangeValue } = RaffleModel()
    const history = useNavigate()
   
    return (
        <Flex direction={'column'} textAlign='left' w={'18rem'} className='raffle-card' position='relative'>
            <Text   fontSize='2rem' fontWeight='bold' textOverflow={'ellipsis'}
                textAlign='center'>{user.raffle_tittle}</Text>
            
            <Image w={'100%'} height='19rem' src={user.image_url} />
            <Flex direction='column' justifyContent='center' padding='1rem 0 2rem 1rem' textAlign='center'  gap='0.5rem' overflow='hidden'>
                <Text fontSize='2.5rem' fontWeight='bold'>{user.name}</Text>
                <Text fontSize='1rem' fontWeight='bold'>Da cidade de {user.city}</Text>
            </Flex>
            
        </Flex>

    );
}
