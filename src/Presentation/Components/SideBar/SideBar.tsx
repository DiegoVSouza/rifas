import {
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    IconButton,
    useDisclosure,
    Image,
    Flex,
} from '@chakra-ui/react';
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import ToggleColorButton from '../ToggleColorButton/ToggleColorButton';
import logo from '../../assets/images/logo.png'

const Sidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useNavigate()

    const goToLink = (url:string) => {
        history('/home/')
        setTimeout(() => window.location.hash = `#${url}`, 100)
        onClose()
    }

    return (
        <>
            <IconButton
                aria-label="Open Menu"
                icon={<RxHamburgerMenu />}
                onClick={onOpen}
                variant="outline"
            />
            <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Image src={logo} w='4rem' />
                    </DrawerHeader>
                    <DrawerBody height='100%' display='flex' flexDirection='column' alignItems='center' justifyContent='space-between'>
                        <Flex w='100%' direction='column' gap='1rem' >
                            <Button variant='ghost' w="full" onClick={() => goToLink('raffles')}>Rifas</Button>
                            <Button variant='ghost' w="full" onClick={() => goToLink('about')}>Como Funciona?</Button>
                            <Button variant='ghost' w="full" onClick={() => goToLink('winners')}>Ganhadores</Button>
                        </Flex>

                        <ToggleColorButton />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Sidebar;
