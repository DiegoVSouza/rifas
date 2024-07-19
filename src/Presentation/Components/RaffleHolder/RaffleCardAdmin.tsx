import { useState } from 'react';
import { Raffle } from '../../../Domain/Model/Raffle';
import './RaffleCard.css'
import {
    Box, Flex, Text, Image, Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import ButtonComponent from '../Inputs/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { IoMdShare } from "react-icons/io";
import { LuArrowLeftRight } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import formatCurrency from '../../../utils/FormatCurrency';
import TruncatedText from '../Inputs/TruncatedText';
import { RaffleModel } from '../../../main/hooks/useRaffleModel';
import { useShopCar } from '../../../main/hooks/useShopCar';
import RaffleButton from '../Inputs/RaffleButton';
import dayjs from 'dayjs';
import OptionModal from '../Modals/OptionModal';

interface RaffleCardAdminInterface {
    raffle: Raffle;
}

export default function RaffleCardAdmin({ raffle }: RaffleCardAdminInterface) {
    const { handleSetraffle_id } = useShopCar()
    const { onChangeValue, Raffle } = RaffleModel()
    const history = useNavigate()
    const { isOpen: isOpenOption, onClose: onCloseOption, onOpen: onOpenOption } = useDisclosure()

    const difference = +new Date(raffle.date) - +new Date();


    const goToRafflePage = () => {
        handleSetraffle_id(raffle.id)
        history(`/rifa/${raffle.title.split(' ').join('-').toLocaleLowerCase()}`)
    }

    const handleOnOpenOption = () => {
        onChangeValue(raffle.id)
        onOpenOption()
    }
    return (
        <>
            <OptionModal isOpen={isOpenOption} onClose={onCloseOption} />
            <Flex direction={['column', 'column', 'column', 'row', 'row']} height={['100%', '100%', '100%', '14rem', '14rem']} textAlign='left' w={'100%'}
                className='row-card' position='relative' gap='1.2rem' borderRadius={'1rem'}>

                <Image w={['100%', '100%', '100%', '30%', '20%']}
                    borderRadius={['1rem 1rem 0 0', '1rem 1rem 0 0', '1rem 0 0 1rem', '1rem 0 0 1rem', '1rem 0 0 1rem']}
                    height='100%' src={raffle.image_url} />
                <Box pl={['1rem', '1rem', '1rem', '0', '0']} w={['100%', '100%', '100%', '60%', '60%']}>
                    <Text className='text-blue' cursor='pointer' onClick={() => goToRafflePage()} fontSize='2rem' fontWeight='bold' textOverflow={'ellipsis'}
                        textAlign='left'>{raffle.title}</Text>
                    <Text fontSize='2.5rem' fontWeight='bold' color='red'>{formatCurrency(raffle.price)}</Text>

                </Box>
                <Flex height='100%' p={['0 0 2rem 1rem', '0 0 2rem 1rem', '0 0 2rem 1rem', '0', '0']} w='100%' justifyContent='space-around'
                    direction='column' gap='1.5rem' mr='1rem' zIndex={10} alignItems={['flex-start', 'flex-start', 'flex-start', 'flex-end', 'flex-end']}>
                    {difference > 0 ? <Text className='text-blue' fontSize='2rem' fontWeight='bold' w='100%' textOverflow={'ellipsis'}
                        textAlign={['left', 'left', 'left', 'right', 'right']}>{dayjs(raffle.date).format("DD/MM/YYYY")}</Text>
                        :
                        <Box w='50%' background='red' borderRadius='1rem' padding='0.5rem'>
                            <Text fontSize='1.2rem' fontWeight='bold' color='white' textAlign='center'>FECHADA</Text>
                        </Box>}
                    <Flex w='100%' flexWrap='wrap' gap='0.5rem'
                        justifyContent={['flex-start', 'flex-start', 'flex-start', 'flex-end', 'flex-end']}>
                        <Box className='info-holder'>
                            <Text fontSize='1rem' fontWeight='bold' color='white'
                                textAlign='center'>Cidade: {raffle.city}</Text>
                        </Box>

                        <Box className='info-holder'>
                            <Text fontSize='1rem' fontWeight='bold' color='white'
                                textAlign='center'>Vendidos: {raffle.total - raffle.free}</Text>
                        </Box>
                        <Box className='info-holder'>
                            <Text fontSize='1rem' fontWeight='bold' color='white'
                                textAlign='center'>Disponíveis: {raffle.free}</Text>
                        </Box>

                    </Flex>
                    <Button justifySelf='flex-end'
                        borderRadius='10px' background='red' color='white' w='9rem' height='2rem' onClick={() => handleOnOpenOption()} >Opções</Button>
                </Flex>
                {/* <Text cursor='pointer' fontSize='1rem' mb='0.5rem'
            fontWeight='regular'>DISPONÍVEIS: {Number(raffle.free)}</Text>
        <Box padding='1rem 0 2rem 1rem' gap='0.5rem' overflow='hidden'>
        </Box>
        <RaffleButton full={false} width='12.5rem' labelName="Números" onClick={() => goToRafflePage()} /> */}
            </Flex>
        </>


    );
}
