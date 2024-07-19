import { useEffect, useState } from 'react';
import { Raffle, RafflePost } from '../../../Domain/Model/Raffle';
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
import imageCompression from 'browser-image-compression';
import { customStyles } from '../../../main/themes/SelectTheme';
import Select from 'react-select';
import LoadingSpinner from '../Notification/LoadingSpinner';

interface WinnerFormInterface {
    isOpen: boolean;
    onClose: () => void;
}

type ValidFileExtensions = {
    [key: string]: string[];
};

const validFileExtensions: ValidFileExtensions = {
    image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
};

function isValidFileType(fileName: string | undefined, fileType: keyof ValidFileExtensions): boolean {
    return !!fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop() || '') > -1;
}

export const winnerSchema = yup.object({
    image_url: yup
        .mixed()
        .required("Selecione uma imagem")
        .test("is-valid-type", "Não é uma imagem valida",
            (value: any) => isValidFileType(value && value[0]?.name?.toLowerCase(), "image")),
}).required();

type winnerImageType = {
    image_url: any
}

export default function WinnerForm({ isOpen, onClose }: WinnerFormInterface) {
    const [city, setCity] = useState('')
    const [image_url, setimage_url] = useState('')
    const [selectedUser, setSelectedUser] = useState<any>(null)
    const [userOptions, setUserOptions] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const { Raffle, postWinner } = RaffleModel()
    const { UsersQuotas, getUsersQuota, User, onChangeValue } = UserModel()

    const {
        register,
        handleSubmit,
        reset,
        setError,
        watch,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm<winnerImageType>({
        resolver: yupResolver(winnerSchema),
    });


    const handleUserChange = (select: any) => {
        setSelectedUser(select)
        console.log(select)
        onChangeValue(select.value, true)
    }

    const submitWinner = async (data: winnerImageType) => {
        const options = {
            maxSizeMB: 4,
            useWebWorker: true,
        };

        let image = data.image_url[0]
        const compressedFile = await imageCompression(image, options);
        data.image_url = compressedFile
        
        if (Raffle && User) {
            let winnerData = {
                raffle_id: Raffle.id,
                user_id: User.id,
                image_url: compressedFile
            }
            postWinner(winnerData).then(() => {
                Notification.success("Usario editado com sucesso")
            }).catch(() => {
                Notification.error("Erro ao criar usuario")
            })
        }

    }

    useEffect(() => {
        Promise.all([getUsersQuota({ limit: 50, page: 1, raffle_id: Raffle?.id })]).then(() => {
            setIsLoading(false)
        })

    }, [])

    useEffect(() => {
        if (UsersQuotas) {
            let options = UsersQuotas.map((item) => ({
                value: item.id,
                label: `${item.name} - ${item.cpf}`
            }));
            setUserOptions(options)
        }

    }, [UsersQuotas])


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Cadastro de Usuario</ModalHeader>
                <ModalCloseButton />
                {isLoading ?
                    <LoadingSpinner />
                    :
                    <ModalBody>
                        <form id='submitwinner' onSubmit={handleSubmit(submitWinner)}>
                            <Text fontWeight='bold'>Rifa</Text>
                            <Input disabled _disabled={{ opacity: '1' }} value={Raffle?.title} />

                            <InputComponent labelName={`Imagem`} type='file' inputName={`image_url`} register={register} errors={errors} />

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
                        </form>
                    </ModalBody>
                }
                <ModalFooter>
                    <ButtonComponent form='submitwinner' type='sumbit' disabled={!selectedUser} width='100%' labelName='Cadastrar' full={false} />
                </ModalFooter>
            </ModalContent>
        </Modal>


    );
}
