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
import './CreateModal.css'
import './OptionModal.css'
import { calculeNumbers } from '../../../utils/Calculate';
import RaffleForm from '../Forms/RaffleForm';
import { FaPlusCircle } from "react-icons/fa";
import UserForm from '../Forms/UserForm';
interface CreateModalInterface {

}


export default function CreateModal({ }: CreateModalInterface) {

    const { isOpen: isOpenRaffle, onClose: onCloseRaffle, onOpen: onOpenRaffle } = useDisclosure()
    const { isOpen: isOpenUser, onClose: onCloseUser, onOpen: onOpenUser } = useDisclosure()
    const { isOpen: isOpen, onClose: onClose, onOpen: onOpen } = useDisclosure()

    return (
        <>
            <RaffleForm isOpen={isOpenRaffle} onClose={onCloseRaffle} />
            <UserForm isOpen={isOpenUser} onClose={onCloseUser} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Button className='option-button' mt='0.5rem' onClick={onOpenRaffle} >Criar Rifa</Button>
                        <Button className='option-button' mt='0.5rem' onClick={onOpenUser} >Cria Usúario</Button>
                    </ModalBody>

                    <ModalFooter>
                       
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Button id='add-button' onClick={onOpen}><FaPlusCircle size='5rem' /></Button>
        </>


    );
}
