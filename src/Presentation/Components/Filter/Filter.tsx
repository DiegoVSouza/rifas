import {
    Box, Flex, Input, Select, Text, useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    InputGroup,
    Checkbox,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    InputLeftElement
} from "@chakra-ui/react";
import { BsSliders, BsViewList } from "react-icons/bs";
import { HiViewGrid } from "react-icons/hi";
import ButtonComponent from "../Inputs/ButtonComponent";
import { IoSearch } from "react-icons/io5";
import './Filter.css';
import RaffleModel from "../../../main/models/RafflesModel";
import SliderMenu from "../Inputs/SliderMenu";
import { useEffect, useState } from "react";
import SelectCity from "../City/SelectCity";
import { motion, AnimatePresence } from 'framer-motion';
interface FilterInterface {
    saveFilter: () => void;
    handleSetWithDiscount: () => void;
    handleSetIsNew: () => void;
    showQuantPag: number;
    isAvaliable: boolean | undefined;
    setShowQuantPag: React.Dispatch<React.SetStateAction<number>>;
    sortedBy: string;
    setSortedBy: React.Dispatch<React.SetStateAction<string>>;
    setSearchName: React.Dispatch<React.SetStateAction<string>>;
    setIsAvaliabe: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    values: [number, number];
    setValues: React.Dispatch<React.SetStateAction<[number, number]>>;
    setCity: React.Dispatch<React.SetStateAction<string>>;
}


export default function Filter({ saveFilter,
    showQuantPag, setShowQuantPag, sortedBy, setSortedBy, setCity, values, setValues,
    isAvaliable, setIsAvaliabe, setSearchName }: FilterInterface) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { Raffles, RafflesPag, getRafflesPag } = RaffleModel()
    const handleSetIsAvaliabe = (avability: string) => {
        if (avability === 'avaliabe') {
            if (isAvaliable === true)
                setIsAvaliabe(undefined)
            else
                setIsAvaliabe(true)
        } else {
            if (isAvaliable === false)
                setIsAvaliabe(undefined)
            else
                setIsAvaliabe(false)
        }
    }


    useEffect(() => {
        getRafflesPag()
    }, [])
    return (
        <Flex id="filter-menu" w='100%'
            flexWrap='wrap' alignItems='flex-start' justifyContent='center' direction='column' gap='1.5rem'>

            <Button className='filter-button filter-active' onClick={() => setIsFilterOpen(!isFilterOpen)}>
                Filtro
            </Button>

            <AnimatePresence>
                {isFilterOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ overflow: 'hidden', width: '100%' }}
                    >
                        <Flex alignItems='center' w='100%' flexWrap='wrap' justifyContent='space-between'>
                            <Flex gap='1rem'>
                                <Button className={isAvaliable === true ? 'filter-button filter-active' : 'filter-button'} onClick={() => handleSetIsAvaliabe('avaliabe')}>Disponível</Button>
                                <Button className={isAvaliable === false ? 'filter-button filter-active' : 'filter-button'} onClick={() => handleSetIsAvaliabe('notavaliabe')}>Fechada</Button>
                            </Flex>
                            <Flex gap='1rem' alignItems='center'>
                                <SliderMenu values={values} setValues={setValues} />
                                <SelectCity isRow setCity={setCity} />
                            </Flex>
                        </Flex>


                    </motion.div>
                )}
            </AnimatePresence>
            <InputGroup w='100%' mt={['2rem', '2rem', '0', '0', '0']}>
                <InputLeftElement pointerEvents='none'>
                    <IoSearch />
                </InputLeftElement>
                <Input placeholder='Procurar por nome' color='black' background='white' onChange={(e) => setSearchName(e.target.value)} />
            </InputGroup>
        </Flex>
    )
}
