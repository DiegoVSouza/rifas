import {
  Box, Flex, Input, Select, Text, useDisclosure, Modal,
  Image,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  InputGroup,
  Checkbox
} from "@chakra-ui/react";

import { useEffect, useState } from 'react';
import LoadingSpinner from "../Notification/LoadingSpinner";
import ButtonComponent from "../Inputs/ButtonComponent";
import Pagination from "../Inputs/Pagination";
import { BsSliders } from "react-icons/bs";
import { HiViewGrid } from "react-icons/hi";
import { BsViewList } from "react-icons/bs";
import './RaffleHolder.css'
import { RaffleGet } from "../../../Domain/Model/Raffle";
import { useNavigate } from "react-router-dom";
import Filter from "../Filter/Filter";
import RaffleCard from "./RaffleCard";
import background from '../../assets/images/backgroundRaffle.png'
import RaffleCardAdmin from "./RaffleCardAdmin";
import { RaffleModel } from "../../../main/hooks/useRaffleModel";

interface RaffleHolderInterface {
  feature?: string;
  title?: string;
  name?: string;
  price?: number;
  goDirectForShop?: boolean;
  discount?: boolean;
  isnew?: boolean;
  setCategory?: boolean;
  pagination: boolean;
  limit: number;
}

export default function RaffleHolder({ feature, title, name, price, discount = undefined, isnew = undefined, goDirectForShop = false, pagination = false, limit = 8 }: RaffleHolderInterface) {
  const { Raffles, getRafflesPag } = RaffleModel()

  const [showQuant, setShowQuant] = useState(limit)
  const [showQuantPag, setShowQuantPag] = useState(16)
  const [sortedBy, setSortedBy] = useState('asc')
  const [isLoading, setIsLoading] = useState(true)
  const [actualPage, setActualPage] = useState(1)
  const [searchName, setSearchName] = useState('')
  const [withDiscount, setWithDiscount] = useState(discount)
  const [isNew, setIsNew] = useState(isnew)
  const [isAvaliable, setIsAvaliabe] = useState<boolean | undefined>(true)
  const [values, setValues] = useState<[number, number]>();
  const [city, setCity] = useState('')
  const history = useNavigate()

  const handleGetRafflePag = (key?: string, value?: string | number | boolean | [number, number] | undefined, load = true) => {
    let params: RaffleGet = {
      name: (searchName && searchName !== '') ? searchName : undefined,
      limit: showQuantPag,
      page: actualPage,
      avaliable: isAvaliable,
    }

    if (key)
      params[key] = value
    if (load)
      setIsLoading(true)
    getRafflesPag(params).then(() => {
      setIsLoading(false)
    })
  }

  useEffect(() => {
    handleGetRafflePag()
  }, [])

  return (
    <Box as='section' textAlign='center' >

      {isLoading ? <LoadingSpinner /> :

        <Box id='raffles'>
          <Box id="raffle-no-pagination" pb='3rem'>
            <Image src={background} />
            {feature && <Text className='text-feature' mb='1rem' >{feature}</Text>}
            {title && <Text fontSize='2rem' pt='2rem' mb='2rem' fontWeight='600' color='white' >{title}</Text>}
            <Flex mb='2rem' flexWrap='wrap' justifyContent='center' padding={['0 1.5rem', '0 2rem', '0 3rem', '0 4rem', '0 6.25rem']} gap='2rem'>
              {Raffles && Raffles.length && Raffles.slice(0, showQuant).map(item => (
                <RaffleCard key={item.id} raffle={item} />
              ))}
            </Flex>
            {/* <ButtonComponent full={false} width='16rem' labelName="Ver mais" onClick={() => showMore()} /> */}
          </Box>
        </Box>

      }
    </Box>
  );
}
