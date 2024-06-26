import { Box, Spinner } from "@chakra-ui/react";

export default function LoadingSpinner(){
    return(
        <Box w='100%' padding='5rem 0'>
        <Spinner w='3rem' height='3rem'/>
        </Box>
    )
}