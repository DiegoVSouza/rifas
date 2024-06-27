import './RaffleComponent.css'
import {
  Box, Text, Image, Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from "@chakra-ui/react";
import { Numbers, Raffle } from '../../../Domain/Model/Raffle';
import CountdownTimer from '../Countdown/Countdown';
import { ReactNode, useEffect, useRef, useState } from 'react';
import ButtonComponent from '../Inputs/ButtonComponent';
import { useShopCar } from '../../../main/hooks/useShopCar';
import RaffleModel from '../../../main/models/RafflesModel';
import InputComponent from '../Inputs/InputComponent';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from 'dayjs';
import { UserSchema } from '../../../Domain/Model/User';
import { apiViaCep } from '../../../Data/Services/api';
import SelectCity from '../City/SelectCity';
import { formatCPF } from '../../../utils/CPF';
import { formatPhone } from '../../../utils/Phone';
import { useNavigate } from 'react-router-dom';
require('dayjs/locale/pt-br')

interface RaffleComponentInterface {
  raffle: Raffle
}

const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const regexTelefone = /^\(\d{2}\) \d{4,5}-\d{4}$/;

export const userSchema = yup.object({
  name: yup.string().required("Informe seu nome"),
  cpf: yup.string().required("Informe seu CPF").matches(regexCPF, "Formato inválido de CPF"),
  phone: yup.string().required("Informe seu telefone").matches(regexTelefone, "Formato inválido de telefone"),
}).required();

export default function RaffleComponent({ raffle }: RaffleComponentInterface) {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [boxes, setBoxes] = useState<JSX.Element[]>([])
  const [showQuant, setShowQuant] = useState(30)
  const [city, setCity] = useState('')

  const difference = +new Date(raffle.date) - +new Date();

  const { onAddNumber, ShopCar } = useShopCar()
  const history = useNavigate()

  const { isOpen, onOpen, onClose } = useDisclosure()


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

  const calculeNumbers = () => {
    let numbers: Numbers[] = []
    for (var i = 1; i <= raffle.total; i++) {
      numbers.push({ number: i, free: true, id: '', raffleId: raffle.id })
    }

    if (raffle.numbers) {
      if (raffle.numbers.length > 0) {
        for (var i = 0; i <= raffle.numbers.length; i++) {
          let index = numbers.findIndex(item => item.number === raffle.numbers[i]?.number)
          numbers[index] = raffle.numbers[i]
        }
      }
    }

    return numbers;
  }

  const handleSelectNumber = (number: number) => {
    let oldNumbers = [...selectedNumbers]
    if (oldNumbers.find(item => item === number)) {
      setSelectedNumbers(oldNumbers.filter(item => item !== number))
    } else {
      oldNumbers.push(number)
      setSelectedNumbers(oldNumbers)
    }
  }

  const renderNumbers = () => {
    let numbers = calculeNumbers()
    let boxes: JSX.Element[] = [];
    numbers.map(item => boxes.push(
      <Box onClick={() => item.free ? handleSelectNumber(item.number) : () => { }} cursor='pointer' className={!item.free ? 'number-select sold' :
        selectedNumbers.find(i => i === item.number) ? 'number-select selected' : 'number-select'} >
        {item.number}
      </Box>))

    setBoxes(boxes)

  }

  const submitNumbers = async (data: UserSchema) => {
    // Dados de exemplo
    const phoneNumber = '558893550370'; // Substitua pelo número de telefone desejado
    const raffleTitle = raffle.title;
    const raffleDate = dayjs(raffle.date).format("DD/MM/YYYY");
    const userName = data.name;
    const userPhone = data.phone;
    const userCPF = data.cpf;
    const cityMsg = city;
    let selectedNumbersMsg = '';
    selectedNumbers.map((i, index) => {
      index < selectedNumbers.length - 1 ? selectedNumbersMsg = selectedNumbersMsg + `${i}, ` : selectedNumbersMsg = selectedNumbersMsg + `${i}`
    })

    // Mensagem personalizada com emojis
    //     const message = `Olá 👋 vim do site do Lucas Rifas e quero fazer uma reserva de números. 

    // 🔖 *Rifa*: ${raffleTitle}
    // 📅 *Data*: ${raffleDate}

    // 📋 *Dados de Usuário*:
    // 👤 *Nome*: ${userName}
    // 📞 *Telefone*: ${userPhone}
    // ✍🏻 *CPF*: ${userCPF}
    // 🏙️ *Cidade*: ${cityMsg}

    // 🔢 *Números*: ${selectedNumbersMsg}

    // 💵 *Total*: R$${String(selectedNumbers.length * raffle.price)}`;

    const message = `Olá vim do site do Lucas Rifas e quero fazer uma reserva de números. 

*Rifa*: ${raffleTitle}
*Data*: ${raffleDate}

*Dados de Usuário*:
*Nome*: ${userName}
*Telefone*: ${userPhone}
*CPF*: ${userCPF}
*Cidade*: ${cityMsg}

*Números*: ${selectedNumbersMsg}
*Total*: R$${String(selectedNumbers.length * raffle.price)}`;

    // Codificação da mensagem para URL
    const encodedMessage = encodeURIComponent(message);

    // Construção do link
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    console.log("Mensagem antes da codificação:", message);
    console.log("Mensagem codificada:", encodedMessage);
    console.log("Link do WhatsApp:", whatsappLink);


    window.open(whatsappLink, '_blank');
    onClose()
    // setTimeout(()=>history('/home/'), 1000)
  }

  const cpf = watch('cpf')
  const phone = watch('phone')
  const modalRef = useRef<any>(null); // Referência para o Select dentro do modal


  useEffect(() => {
    if (cpf && cpf.length > 10)
      setValue('cpf', formatCPF(cpf))
  }, [cpf])

  useEffect(() => {
    if (phone && phone.length > 8)
      setValue('phone', formatPhone(phone))
  }, [phone])

  useEffect(() => {
    renderNumbers()
  }, [selectedNumbers])



  return (
    <Flex id="raffle" as='section' pb='2rem' direction='column' >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de informações</ModalHeader>
          <ModalCloseButton />
          <ModalBody ref={modalRef}>
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

      <Text fontSize='1.5rem' padding={['2rem 1rem', '2rem 2rem', '2rem 2rem', '2rem 10rem', '2rem 10rem']}
        fontWeight='bold' color='white'>{raffle.title}</Text>

      <CountdownTimer targetDate={String(raffle.date)} />

      <Image src={raffle.imageUrl} padding={['0', '0', '0', '2rem 10rem', '2rem 10rem']} w='100%'
        height={['17rem', '17rem', '35rem', '35rem', '35rem']} objectFit='contain' />
      {difference > 0 && <Flex direction='column'>

        <Text fontSize='3rem' padding={['0 1rem', '0 2rem', '0 2rem', '0 10rem', '0 10rem']}
          fontWeight='bold' color='red'>R${raffle.price}</Text>

        <Text fontSize='1.2rem' padding={['1rem 1rem', '2rem 2rem', '2rem 2rem', '2rem 10rem', '2rem 10rem']}
          fontWeight='bold' color='white'>Escolha um número</Text>

        <Flex flexWrap='wrap' w='100%' gap='12px' padding={['1rem 1.5rem', '2rem 2.5rem', '2rem 2.5rem', '2rem 12rem', '2rem 12rem']}>
          {boxes.slice(0, showQuant)}
        </Flex>

        {showQuant <= boxes.length && <Flex justifyContent='center' alignSelf='center'
          width={['70%', '70%', '50%', '40%', '40%']} m='1rem 0'>
          <ButtonComponent width='100%' labelName='Ver mais números' full onClick={() => setShowQuant(showQuant + 30)} />
        </Flex>}

        <Flex padding={['1rem 1rem', '2rem 2rem', '2rem 2rem', '2rem 10rem', '2rem 10rem']}
          justifyContent={['center', 'center', 'flex-start', 'flex-start', 'flex-start']}
          alignItems={['flex-start', 'flex-start', 'center', 'center', 'center']}
          direction={['column', 'column', 'row', 'row', 'row']}
          gap='0.5rem'>
          <Flex alignItems='center' gap='0.5rem'>
            <Text fontSize='1rem' fontWeight='regular' color='white'>Disponíveis:</Text> <Box w='1.5rem' h='1.5rem' borderRadius='2px' background='white'></Box>
          </Flex>
          <Flex alignItems='center' gap='0.5rem'>
            <Text fontSize='1rem' fontWeight='regular' color='white'>Comprados:</Text> <Box w='1.5rem' h='1.5rem' borderRadius='2px' background='red'></Box>
          </Flex>
          <Flex alignItems='center' gap='0.5rem'>
            <Text fontSize='1rem' fontWeight='regular' color='white'>Selecionados:</Text> <Box w='1.5rem' h='1.5rem' borderRadius='2px' background='#0B5270'></Box>
          </Flex>
        </Flex>
        <Flex justifyContent='center' alignSelf='center'
          width={['70%', '70%', '50%', '40%', '40%']} m='1rem 0'>
          <ButtonComponent disabled={selectedNumbers.length < 1} width='100%' labelName='Comprar' full={false} onClick={onOpen} />
        </Flex>

      </Flex>}


      <Flex padding={['1rem 1rem', '2rem 2rem', '2rem 2rem', '2rem 10rem', '2rem 10rem']} flexWrap='wrap' gap='0.75rem'>
        <Box className='raffle-info'>
          <Text fontWeight='bold'>Cidade</Text>
          <Text fontWeight='regular'>{raffle.city}</Text>
        </Box>
        <Box className='raffle-info'>
          <Text fontWeight='bold'>Data do sorteio</Text>
          <Text fontWeight='regular'>{dayjs(raffle.date).format('DD/MM/YYYY')}</Text>
        </Box>
        <Box className='raffle-info'>
          <Text fontWeight='bold'>Premio 01</Text>
          <Text fontWeight='regular'>{raffle.title}</Text>
        </Box>
      </Flex>
      {
        raffle.winners?.length && (
          <Box padding={['2rem 1rem', '2rem 2rem', '2rem 2rem', '2rem 10rem', '2rem 10rem']}>
            <Text fontSize='1.2rem' fontWeight='bold' color='white' mb='1rem'>Ultimos ganhadores</Text>
            {raffle.winners.map(winner => (

              <Flex flexWrap='wrap' gap='0.75rem' mb='0.75rem'>
                <Box className='raffle-info winners'>
                  <Text fontWeight='bold'>{winner.name}</Text>
                </Box>
                <Box className='raffle-info winners'>
                  <Text >{winner.city}</Text>
                </Box>
              </Flex>
            ))}
          </Box>
        )
      }


    </Flex>
  );
}
