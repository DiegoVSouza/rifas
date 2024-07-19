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

interface RaffleFormInterface {
    isOpen: boolean;
    onClose: () => void;
    raffle?: Raffle;
}
const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const regexTelefone = /^\(\d{2}\) \d{4,5}-\d{4}$/;

type ValidFileExtensions = {
    [key: string]: string[];
};

const validFileExtensions: ValidFileExtensions = {
    image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
};

function isValidFileType(fileName: string | undefined, fileType: keyof ValidFileExtensions): boolean {
    return !!fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop() || '') > -1;
}

export const raffleSchema = yup.object({
    title: yup.string().required("O título é obrigatório"),
    image_url: yup
        .mixed()
        .required("Selecione uma imagem")
        .test("is-valid-type", "Não é uma imagem valida",
            (value: any) => isValidFileType(value && value[0]?.name?.toLowerCase(), "image")),
    price: yup.number().positive("O preço deve ser um valor positivo").required("O preço é obrigatório"),
    total: yup.number().integer("O total deve ser um número inteiro").positive("O total deve ser um valor positivo").required("O total é obrigatório"),
    date: yup.date().required("A data é obrigatória"),
    regulation: yup.string().required("O regulamento é obrigatório"),
    description: yup.string().required("A descrição é obrigatória"),
}).required();


export default function RaffleForm({ isOpen, onClose, raffle }: RaffleFormInterface) {
    const [city, setCity] = useState('')
    const [image_url, setimage_url] = useState('')

    const { postRaffles, putRaffles } = RaffleModel()
    const {
        register,
        handleSubmit,
        reset,
        setError,
        watch,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm<Omit<RafflePost, 'city'>>({
        resolver: yupResolver(raffleSchema),
    });

    const submitUser = async (data: Omit<RafflePost, 'city'>) => {

        const options = {
            maxSizeMB: 4,
            useWebWorker: true,
        };
        

        let image = data.image_url[0]
        const compressedFile = await imageCompression(image, options);
        data.image_url = compressedFile

        let rafflePost = { ...data, city }

        console.log('compressedFile', rafflePost)

        if (raffle){
            let raffleEdit = {...rafflePost, id: raffle.id}
            putRaffles(raffleEdit).then(() => {
                Notification.success("Usario editado com sucesso")
            }).catch((error) => {
                Notification.error("Erro ao criar usuario")
            })
        }
        else
            postRaffles(rafflePost).then(() => {
                Notification.success("Usario cadastrado com sucesso")
            }).catch((error) => {
                Notification.error("Erro ao criar usuario")
            })
    }
    type keyType = keyof Omit<RafflePost, 'city'>;


    useEffect(() => {
        if (raffle) {
            Object.entries(raffle).forEach(([key, value]) => {
                if (key === 'city')
                    setCity(raffle.city)
                else if (key === 'date'){
                console.log(">>>>>>>>", key, new Date(value))
                setValue((`${key}`) as keyType, new Date(value));
                }
                else
                    setValue((`${key}`) as keyType, value);

            });
        }
    }, [raffle])


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Cadastro de Usuario</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form id='submituser' onSubmit={handleSubmit(submitUser)}>
                        <InputComponent labelName="Título" inputName="title" register={register} errors={errors} />
                        <Flex w='100%'>
                            <InputComponent labelName="Total" inputName="total" register={register} errors={errors} />
                            <InputComponent type='number' labelName="Preço" inputName="price" register={register} errors={errors} />
                        </Flex>
                            <InputComponent labelName='Data' type='date' inputName='date' register={register} errors={errors} />
                            <InputComponent labelName={`Imagem`} type='file' inputName={`image_url`} register={register} errors={errors} />
                        <InputComponent labelName='Descrição' textArea inputName='description' register={register} errors={errors} />
                        <InputComponent labelName='Regulamento' textArea inputName='regulation' register={register} errors={errors} />
                        <Text fontSize='1.2rem' fontWeight='bold' mb='1rem' mt='3m'>Escolha o estado e cidade</Text>
                        <SelectCity city={raffle ? city : undefined} setCity={setCity} />

                    </form>
                </ModalBody>

                <ModalFooter>
                    <ButtonComponent form='submituser' disabled={city === ''} width='100%' labelName='Cadastrar' full={false} type='submit' />
                </ModalFooter>
            </ModalContent>
        </Modal>


    );
}
