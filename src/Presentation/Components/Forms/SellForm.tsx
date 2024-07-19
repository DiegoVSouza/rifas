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
    Input,
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
import { calculeNumbers } from '../../../utils/Calculate';
import LoadingSpinner from '../Notification/LoadingSpinner';

interface SellFormInterface {
    isOpen: boolean;
    onClose: () => void;
}


export default function SellForm({ isOpen, onClose }: SellFormInterface) {
    const [city, setCity] = useState('')
    const [raffleOptions, setRaffleOption] = useState<any[]>([])
    const [userOptions, setUserOptions] = useState<any[]>([])
    const [numbersOptions, setNumbersOptions] = useState<any[]>()
    const [selectedRaffle, setSelectedRaffle] = useState<any>()
    const [selectedUser, setSelectedUser] = useState<any>()
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const { postQuotas, getRaffles, onChangeValue, Raffles, Raffle } = RaffleModel()
    const { getUsers, Users } = UserModel()



    const submitQuota = () => {
        if (Raffle) {
            let quota = {
                raffle_id: Raffle?.id,
                user_id: selectedUser.value,
                quotas: selectedNumbers.map((item: any) => item.value)
            }

            console.log('>>>>>>>>>>> quota', quota)

            postQuotas(quota).then(() => {
                Notification.success("Cota vendida com sucesso")
            }).catch((error) => {
                Notification.error("Erro ao vender cota")
            })
        } else {
            Notification.error("Erro ao vender cota")

        }

    }

    const handleRaffleChange = (select: any) => {
        setSelectedRaffle(select)
    }

    const handleUserChange = (select: any) => {
        setSelectedUser(select)
    }

    const handleNumbersChange = (select: any) => {
        console.log("select", select)
        setSelectedNumbers(select)
    }

    useEffect(() => {
        Promise.all([getUsers({ limit: 50, page: 1 })]).then(() => {
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        if (Raffles) {
            let options = Raffles.map((item) => ({
                value: item.id,
                label: item.title
            }));
            setRaffleOption(options)
        }

    }, [Raffles])

    useEffect(() => {
        if (Users) {
            let options = Users.map((item) => ({
                value: item.id,
                label: `${item.name} - ${item.cpf}`
            }));
            setUserOptions(options)
        }

    }, [Users])

    // useEffect(() => {
    //     if (selectedRaffle)
    //         onChangeValue(selectedRaffle?.value)
    // }, [selectedRaffle])

    useEffect(() => {
        if (Raffle) {
            let numbers = calculeNumbers(Raffle.total, Raffle.quotas, Raffle.id)
            let options: any[] = []
            numbers.map(item => {
                if (item.free)
                    options.push({
                        value: item.number,
                        label: `${item.number}`
                    })
            })
            setNumbersOptions(options)
        }

    }, [Raffle])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Venda de cota</ModalHeader>
                <ModalCloseButton />
                {isLoading ?
                    <LoadingSpinner />
                    :
                    <ModalBody>
                        <form id='submitquota'>

                            <Text fontWeight='bold'>Rifa</Text>
                            <Input disabled _disabled={{ opacity: '1' }} value={Raffle?.title} />

                            <Text fontWeight='bold' >Usuario</Text>
                            <Select
                                options={userOptions}
                                value={selectedUser}
                                onChange={handleUserChange}
                                placeholder="Selecione o usuario"
                                styles={customStyles}
                                menuPortalTarget={document.body}
                                menuPosition="fixed"
                                menuPlacement="auto"
                            />

                            <Text fontWeight='bold'>Numeros</Text>
                            <Select
                                options={numbersOptions}
                                value={selectedNumbers}
                                onChange={handleNumbersChange}
                                placeholder="Selecione os números"
                                styles={customStyles}
                                menuPortalTarget={document.body}
                                menuPosition="fixed"
                                menuPlacement="auto"
                                isMulti
                            />
                        </form>
                    </ModalBody>
                }


                <ModalFooter>
                    <ButtonComponent form='submitquota' onClick={() => submitQuota()} width='100%' labelName='Vender cota' full={false} />
                </ModalFooter>
            </ModalContent>
        </Modal>


    );
}
