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
import RaffleModel from '../../../main/models/RafflesModel';
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

interface UserFormInterface {
    isOpen: boolean;
    onClose: () => void;
}
const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const regexTelefone = /^\(\d{2}\) \d{4,5}-\d{4}$/;

export const userSchema = yup.object({
    name: yup.string().required("Informe seu nome"),
    cpf: yup.string().required("Informe seu CPF").matches(regexCPF, "Formato inválido de CPF"),
    phone: yup.string().required("Informe seu telefone").matches(regexTelefone, "Formato inválido de telefone"),
}).required();

export default function UserForm({ isOpen, onClose }: UserFormInterface) {
    const [city, setCity] = useState('')

    const { postUsers } = UserModel()

    const {
        register,
        handleSubmit,
        reset,
        setError,
        watch,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm<UserSchema>({
        resolver: yupResolver(userSchema),
    });

    const submitNumbers = (data: UserSchema) => {
        let user = { ...data, city: city }

        postUsers(user).then(() => {
            Notification.success("Usario cadastrado com sucesso")
        }).catch((error) => {
            Notification.error("Erro ao criar usuario")
        })
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Cadastro de Usuario</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form id='submitnumbers' onSubmit={handleSubmit(submitNumbers)}>
                        <InputComponent labelName="Nome" inputName="name" register={register} errors={errors} />
                        <InputComponent maxLength={14} labelName="CPF" inputName="cpf" register={register} errors={errors} />
                        <InputComponent maxLength={15} labelName="Telefone" inputName="phone" register={register} errors={errors} />
                        <Text fontSize='1.2rem' fontWeight='bold' mb='1rem' mt='3rem'>Escolha seu estado e cidade</Text>
                        <SelectCity setCity={setCity} />
                    </form>
                </ModalBody>

                <ModalFooter>
                    <ButtonComponent form='submitnumbers' disabled={city === ''} width='100%' labelName='Comprar' full={false} type='submit' />
                </ModalFooter>
            </ModalContent>
        </Modal>


    );
}
