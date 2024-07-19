import { useEffect, useState } from 'react';
import { NumbersPost, Raffle } from '../../../Domain/Model/Raffle';
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
import InputComponent from '../Inputs/InputComponent';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSchema } from '../../../Domain/Model/User';
import SelectCity from '../City/SelectCity';
import UserModel from '../../../main/models/UserModel';
import Notification from '../Notification/Notification';
import Select from 'react-select';
import { customStyles } from '../../../main/themes/SelectTheme';
import SellForm from '../Forms/SellForm';
import './OptionModal.css'
import { calculeNumbers } from '../../../utils/Calculate';
import RaffleForm from '../Forms/RaffleForm';
import WinnerForm from '../Forms/WinnerForm';

interface OptionModalInterface {
    isOpen: boolean;
    onClose: () => void;
}


export default function OptionModal({ isOpen, onClose }: OptionModalInterface) {

    const { isOpen: isOpenSell, onClose: onCloseSell, onOpen: onOpenSell } = useDisclosure()
    const { isOpen: isOpenRaffle, onClose: onCloseRaffle, onOpen: onOpenRaffle } = useDisclosure()
    const { isOpen: isOpenWinner, onClose: onCloseWinner, onOpen: onOpenWinner } = useDisclosure()

    const { Raffle } = RaffleModel()

    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose}>

                <ModalOverlay />
                <ModalContent >
                    <RaffleForm raffle={Raffle} isOpen={isOpenRaffle} onClose={onCloseRaffle} />
                    <SellForm isOpen={isOpenSell} onClose={onCloseSell} />
                    <WinnerForm isOpen={isOpenWinner} onClose={onCloseWinner} />
                    <ModalHeader>Opções</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box p='1rem 0.5rem'>
                            <Button className='option-button blue-button' onClick={onOpenSell}  >Vender Número</Button>
                            <Button className='option-button' mt='0.5rem' onClick={onOpenRaffle} >Configurações</Button>
                            <Button className='option-button' mt='0.5rem' onClick={onOpenWinner} >Cadastrar Vencendor</Button>
                        </Box>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>



    );
}
