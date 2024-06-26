import { useEffect } from "react";
import './Footer.css'
import { Box, Flex, Image, Input, Text, Button, Divider } from "@chakra-ui/react";
import logo from '../../assets/images/logo.svg'
import { useNavigate } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


export default function Footer() {

    const history = useNavigate()
    const goToLink = (url: string) => {
        history('/home/')
        setTimeout(() => window.location.hash = `#${url}`, 100)
    }

    return (
        <footer id="pagFooter">
            <Flex as='section' flexWrap='wrap' direction='column' gap='2.5rem' mb='3rem' alignItems='center' justifyContent='center'>
                <Flex className="footer-links" justifyContent='space-between' w={['100%', '80%', '50%', '50%', '30%']}>
                    <Text variant='link' fontSize='0.8rem' onClick={() => goToLink('raffles')}>Rifas</Text>
                    <Text variant='link' fontSize='0.8rem' onClick={() => goToLink('about')}>Como Funciona?</Text>
                    <Text variant='link' fontSize='0.8rem' onClick={() => goToLink('winners')}>Ganhadores</Text>
                </Flex>
                <Flex className="footer-social" w={['80%', '60%', '40%', '40%', '30%']}>
                    <Box>
                        <FaInstagram />
                    </Box>
                    <Box>
                        <FaXTwitter />
                    </Box>
                    <Box>
                        <FaYoutube />
                    </Box>
                    <Box>
                        <FaFacebook />
                    </Box>
                </Flex>
                    <Image src={logo} />
            </Flex>
            <hr />
            <Text mt='2.2rem' fontWeight='100' fontSize='0.85rem' color='white' >Lucas Rifa 2024 - Todos os Direitos Reservados.</Text>
            </footer>
    );
}
