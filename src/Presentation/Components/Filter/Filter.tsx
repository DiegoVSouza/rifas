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
    InputLeftElement
} from "@chakra-ui/react";
import { BsSliders, BsViewList } from "react-icons/bs";
import { HiViewGrid } from "react-icons/hi";
import ButtonComponent from "../Inputs/ButtonComponent";
import { IoSearch } from "react-icons/io5";
import './Filter.css';
import RaffleModel from "../../../main/models/RafflesModel";

interface FilterInterface {
    saveFilter: () => void;
    handleSetWithDiscount: () => void;
    handleSetIsNew: () => void;
    showQuantPag: number;
    setShowQuantPag: React.Dispatch<React.SetStateAction<number>>;
    sortedBy: string;
    setSortedBy: React.Dispatch<React.SetStateAction<string>>;
    setSearchName: React.Dispatch<React.SetStateAction<string>>;
}


export default function Filter({ saveFilter, 
    showQuantPag, setShowQuantPag, sortedBy, setSortedBy, setSearchName }: FilterInterface) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { Raffles, RafflesPag } = RaffleModel()

    return (
        <Flex id="filter-menu" padding={['1rem 2rem', '1rem 2rem', '1rem 3rem', '1.5rem 6.25rem', '1.5rem 6.25rem']}
            flexWrap='wrap' alignItems='center' justifyContent={['center', 'center', 'space-between', 'space-between', 'space-between']} >
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Filtro</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                       
                        <Flex alignItems='center' mt='1rem' gap='0.2rem'>
                            <Text fontSize='1rem' fontWeight='400'>
                                Mostrar
                            </Text>
                            <Input w='3.5rem' h='3.5rem' background='white' value={showQuantPag} onChange={(e) => setShowQuantPag(+e.target.value)} />
                            <Text fontSize='1rem' fontWeight='400'>
                                Ordenar por
                            </Text>
                            <Select w='10rem' h='3.5rem' background='white' value={sortedBy} onChange={(e) => setSortedBy(e.target.value)}>
                                <option value={'asc'}>Crescente</option>
                                <option value={'dsc'}>Descrescente</option>
                            </Select>
                        </Flex>

                    </ModalBody>

                    <ModalFooter gap='1rem'>
                        <ButtonComponent width='40%' full={true} onClick={() => saveFilter()} labelName='Save' />
                        <Button variant='ghost' height='3rem' onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Flex className='icon-holder' gap={['2rem', '2rem', '2rem', '0.75rem', '0.75rem']} flexWrap='wrap' alignItems='center'>
                <Flex onClick={onOpen} gap='0.75rem' alignItems='center' id="filter">
                    <BsSliders size='1.5rem' style={{ transform: 'scaleX(-1)' }} />
                    <Text fontSize='1.25rem' >Filter</Text>
                </Flex>
                {/* <HiViewGrid size='1.5rem' />
                <BsViewList size='1.5rem' /> */}
                <Text id="number-resume" fontSize='1rem' ml={['0', '0', '2rem', '2rem', '2rem']} fontWeight='400'>
                    Mostrando {Raffles?.length || 0} de {RafflesPag.total} produtos
                </Text>
            </Flex>
            
            <InputGroup w={['100%', '100%', '40%', '30%', '30%']} mt={['2rem', '2rem', '0', '0', '0']}>
                    <InputLeftElement pointerEvents='none'>
                        <IoSearch  />
                    </InputLeftElement>
                    <Input placeholder='Procurar por nome' color='black' background='white' onChange={(e)=>setSearchName(e.target.value)} />
                </InputGroup>
        </Flex>
    )
}
