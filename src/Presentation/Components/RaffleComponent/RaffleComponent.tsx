import './RaffleComponent.css'
import { Box, Text, Image, Flex } from "@chakra-ui/react";
import { Numbers, Raffle } from '../../../Domain/Model/Raffle';
import CountdownTimer from '../Countdown/Countdown';
import { ReactNode, useState } from 'react';
interface RaffleComponentInterface {
  raffle: Raffle
}

export default function RaffleComponent({ raffle }: RaffleComponentInterface) {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const calculeNumbers = () => {
    let numbers: Numbers[] = []
    for (var i = 1; i <= raffle.total; i++) {
      numbers.push({ number: i, sold: false, token: '' })
    }

    if (raffle.numbers) {
      if (raffle.numbers.length > 0) {
        for (var i = 0; i <= raffle.numbers.length; i++) {
          let index = numbers.findIndex(item => item.number === raffle.numbers[i].number)
          numbers[index] = raffle.numbers[i]
        }
      }
    }

    return numbers;
  }

  const renderNumbers = () => {
    let numbers = calculeNumbers()
    let boxes: JSX.Element[] = [];
    numbers.map(item => boxes.push(
      <Box className={item.sold ? 'number-select sold' :
        selectedNumbers.find(i => i === item.number) ? 'number-select selected' : 'number-select'} >
        {item.number}
      </Box>))

    return boxes
  }

  return (
    <Box id="raffle" as='section' mb='5.6rem'>
      <Text fontSize='1.5rem' padding={['2rem 1rem', '2rem 2rem', '2rem 2rem', '2rem 3.5rem', '2rem 3.5rem']}
        fontWeight='bold' color='white'>{raffle.name}</Text>
      <CountdownTimer targetDate={String(raffle.date_time)} />
      <Image src={raffle.image_link} w='100%' height='17rem' objectFit='cover' />
      <Text fontSize='3rem' padding={['1rem 1rem', '2rem 2rem', '2rem 2rem', '2rem 3.5rem', '2rem 3.5rem']}
        fontWeight='bold' color='red'>R${raffle.price}</Text>
      <Text fontSize='1.2rem' padding={['1rem 1rem', '2rem 2rem', '2rem 2rem', '2rem 3.5rem', '2rem 3.5rem']}
        fontWeight='bold' color='white'>Escolha um número</Text>

      <Flex flexWrap='wrap' gap='12px' padding={['1rem 1.5rem', '2rem 2.5rem', '2rem 2.5rem', '2rem 4rem', '2rem 4rem']}>
        {renderNumbers()}
      </Flex>
    </Box>
  );
}
