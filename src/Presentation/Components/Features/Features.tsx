import { Text, Flex, Image, Box } from '@chakra-ui/react';
import './Features.css';
import trophy from '../../assets/images/trophy 1.svg'
import guarantee from '../../assets/images/guarantee.svg'
import shipping from '../../assets/images/shipping.svg'
import customerSupport from '../../assets/images/customer-support.svg'
import background from '../../assets/images/fundoFeature.png'
import choose from '../../assets/images/choose.svg'
import payment from '../../assets/images/payment.svg'
import award from '../../assets/images/award.svg'

export default function Features() {

    return (
        <Box id='howdo' padding={['1rem', '2rem 2.5rem', '2rem 2.5rem', '2rem 5rem', '2rem 5rem']}>
            <Text className='text-yellow' fontSize='1rem' >Comprando bilhetes</Text>
            <Text fontWeight='bold' color='white' fontSize='1.5rem' mb='1rem'>VEJA AQUI COMO É FÁCIL COMPRAR</Text>
            <Flex id='features' mb='1rem' flexWrap='wrap' gap={['2rem', '1rem', '1rem', '1rem', '0']} height={['100%', '100%', '100%', '100%', '17rem']} as='section'
                alignItems='center' justifyContent='space-between' >

                <Flex>
                    <Image className='background-feature background-1' src={background} />
                    <Box className='icon-holder' >
                        <Image src={choose} />
                    </Box>
                    <Box>
                        <Text fontWeight='bold' fontSize='1.5rem'>ESCOLHA SEUS NÚMEROS</Text>
                        <Text fontWeight='regular'  >Escolha os números que você deseja, pode ser quantos quiser! </Text>
                    </Box>
                </Flex>
                <Flex>
                    <Image className='background-feature background-2' src={background} />
                    <Box className='icon-holder' >
                        <Image src={payment} />

                    </Box>
                    <Box>
                        <Text fontWeight='bold' fontSize='1.5rem'>FAÇA O PAGAMENTO</Text>
                        <Text fontWeight='regular'  >Faça o pagamento dos números que você escolheu</Text>
                    </Box>
                </Flex>
                <Flex>
                    <Image className='background-feature background-3' src={background} />
                    <Box className='icon-holder' >
                        <Image src={award} />

                    </Box>
                    <Box>
                        <Text fontWeight='bold' fontSize='1.5rem'>ESPERE O SORTEIO E TORÇA!</Text>
                        <Text fontWeight='regular'  >Agora é so relaxar e esperar o sorteio, não esqueça de torcer!</Text>
                    </Box>
                </Flex>

            </Flex>
        </Box>

    );
}
