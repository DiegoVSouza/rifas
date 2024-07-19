import './Header.css'
import {
    Button, Flex, ListItem, UnorderedList, Image, Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Portal,
    Box,
} from "@chakra-ui/react";
import { IsMobile } from "../../../utils/IsMobile";
import ToggleColorButton from "../ToggleColorButton/ToggleColorButton";
import { useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import logo from '../../assets/images/logo.png'
import Sidebar from "../SideBar/SideBar";
import { FaRegUser } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import RaffleButton from '../Inputs/RaffleButton';

export default function Header() {
    const history = useNavigate()
    const goToLink = (url: string) => {
        history('/home/')
        setTimeout(() => window.location.hash = `#${url}`, 100)
    }

    const renderHeader = () => {
        if (IsMobile())
            return (<>
                <Flex >
                    <ListItem cursor='pointer' onClick={() => history('/home')}><Image src={logo} w='5rem' /></ListItem>
                </Flex>
                <Flex gap='1rem' className='nav-buttons'>
                    <ListItem><Button variant='link' fontSize='1.2rem' onClick={() => goToLink('raffles')}>Rifas</Button></ListItem>
                    <ListItem><Button variant='link' fontSize='1.2rem' onClick={() => goToLink('howdo')}>Como Funciona?</Button></ListItem>
                    <ListItem><Button variant='link' fontSize='1.2rem' onClick={() => history('/winners')}>Ganhadores</Button></ListItem>
                </Flex>

                <Flex justifyContent='space-between' alignItems='center' gap='2.5rem'>
                <RaffleButton onClick={() => goToLink('raffles')} full labelName='Comprar Números'/>
                </Flex>
            </>)
        else
            return (<>
                <Sidebar />
                <ListItem cursor='pointer' onClick={() => history('/home')}><Image src={logo} w='5rem' /></ListItem>
            </>)
    }
    return (
        <nav>
            <UnorderedList id='header-ul' padding='1rem'>
                {renderHeader()}
            </UnorderedList>
        </nav>
    );
}
