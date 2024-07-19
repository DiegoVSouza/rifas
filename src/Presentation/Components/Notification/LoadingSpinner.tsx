import { Flex, Spinner } from "@chakra-ui/react";

export default function LoadingSpinner(){
    return(
        <Flex justifyContent='center' alignItems='center' w='100%' padding='5rem 0'>
        <Spinner w='3rem' height='3rem'/>
        </Flex>
    )
}