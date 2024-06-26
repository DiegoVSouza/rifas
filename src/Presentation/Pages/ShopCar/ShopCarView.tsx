import './ShopCarView.css'
import { Box, Flex, Text, Image, Button, Input } from "@chakra-ui/react";
import TittleBox from '../../Components/TittleBox/TittleBox';
import formatCurrency from '../../../utils/FormatCurrency';
import { upperCaseFirstLetter } from '../../../utils/TextUltis';
import { useEffect } from 'react';
import { useShopCar } from '../../../main/hooks/useShopCar';
import { LiaSadTear } from "react-icons/lia";
import ButtonComponent from '../../Components/Inputs/ButtonComponent';

export default function ShopCarView() {


  return (
    <main>
      <TittleBox />
      <Box as='section' padding={['1rem 1.5rem', '2rem 2rem', '2rem 3rem', '2rem 4rem', '4rem 6.25rem']}>
    

      </Box>
    </main>
  );
}
