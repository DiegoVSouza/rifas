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
import RaffleModel from "../../../main/models/RafflesModel";
import RaffleCard from "./RaffleCard";
import background from '../../assets/images/backgroundRaffle.png'
import RaffleCardAdmin from "./RaffleCardAdmin";

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

export default function RaffleHolder({ feature, title, setCategory = false, name, price, discount = undefined, isnew = undefined, goDirectForShop = false, pagination = false, limit = 8 }: RaffleHolderInterface) {
  const { Raffles, getRafflesPag, RafflesPag } = RaffleModel()

  const [showQuant, setShowQuant] = useState(limit)
  const [showQuantPag, setShowQuantPag] = useState(16)
  const [sortedBy, setSortedBy] = useState('asc')
  const [isLoading, setIsLoading] = useState(true)
  const [actualPage, setActualPage] = useState(1)
  const [searchName, setSearchName] = useState('')
  const [withDiscount, setWithDiscount] = useState(discount)
  const [isNew, setIsNew] = useState(isnew)
  const [isAvaliable, setIsAvaliabe] = useState<boolean | undefined>(undefined)
  const [values, setValues] = useState<[number, number]>([10, 900]);
  const [city, setCity] = useState('')
  const history = useNavigate()

  const currentDiscount = () => {
    if (discount) {
      return withDiscount ? withDiscount : undefined
    } else {
      if (withDiscount) {
        return withDiscount
      } else {
        return discount
      }
    }
  }

  const handleGetRafflePag = (key?: string, value?: string | number | boolean | undefined, load = true) => {
    let params: RaffleGet = {
      name: (searchName && searchName !== '') ? searchName : undefined,
      price, limit: showQuantPag,
      page: actualPage, sorted_by: sortedBy,
      avaliable: isAvaliable,
      discount: currentDiscount()
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
    if (pagination) {
      handleGetRafflePag()
    } else {
      getRafflesPag({
        name, price, limit: limit * 2, page: 1,
        discount: currentDiscount()
      }).then(() => {
        setIsLoading(false)
      })
    }

  }, [])

  useEffect(() => {
    if (searchName != '')
      handleGetRafflePag('name', searchName, false)
  }, [searchName])


  const showMore = () => {
    if (goDirectForShop) {
      history('/home/loja')
    }
    if (showQuant >= (limit * 2)) {
      history('/home/loja')
    }
    let newLimit = showQuant + limit
    setShowQuant(newLimit)
  }

  const goToPage = (page: number) => {
    handleGetRafflePag('page', page)
    setActualPage(page)
  }

  const saveFilter = () => {
    handleGetRafflePag()
  }

  const handleSetWithDiscount = () => {
    setWithDiscount(!withDiscount);
  };

  const handleSetIsNew = () => {
    setIsNew(!isNew);
  }

  console.log(Raffles)

  return (
    <Box as='section' textAlign='center' >

      {isLoading ? <LoadingSpinner /> :

        <Box id='raffles'>
          {
            pagination ?
              <Box id="raffle-pagination" padding={['1rem 1rem', '2rem 2rem', '2rem 2rem', '2rem 10rem', '2rem 15rem']}>
                <Filter handleSetIsNew={handleSetIsNew} handleSetWithDiscount={handleSetWithDiscount}
                  saveFilter={saveFilter}
                  setShowQuantPag={setShowQuantPag}
                  setSearchName={setSearchName}
                  setIsAvaliabe={setIsAvaliabe}
                  isAvaliable={isAvaliable}
                  setSortedBy={setSortedBy} showQuantPag={showQuantPag} sortedBy={sortedBy}
                  values={values} setValues={setValues}
                  setCity={setCity} />
                <Box>
                  {feature && <Text className='text-feature' mb='1rem' >{feature}</Text>}
                  {title && <Text fontSize='2.5rem' mb='2rem' fontWeight='600' >{title}</Text>}
                  <Flex mb='2rem' mt={title ? '' : '2rem'} flexWrap='wrap' direction='column' justifyContent='center' gap='2rem'>
                    {Raffles && Raffles.length && Raffles.map(item => (
                      <RaffleCardAdmin key={item.id} raffle={item} />
                    ))}
                  </Flex>
                  <Pagination actualPage={actualPage} numberOfpages={RafflesPag.pages} onClick={goToPage} />
                </Box>
              </Box>

              :
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
          }
        </Box>

      }
    </Box>
  );
}
