// SliderMenu.tsx
import React, { useState } from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Box,
    Text
} from '@chakra-ui/react';
import { IoIosArrowDown } from "react-icons/io";
import ReactSlider from 'react-slider';
import './SliderMenu.css'; 
interface SliderMenuInterface {
    values: [number, number];
    setValues: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const SliderMenu = ({ values, setValues }: SliderMenuInterface) => {

    return (
        <Menu>
        <MenuButton borderRadius='12px' as={Button} rightIcon={<IoIosArrowDown />}>
            <Text>R$ {values[0]} - R$ {values[1]}</Text>
        </MenuButton>
        <MenuList>
          <Box padding='1rem 2rem'>
            <Text w='15rem'>Faixa selecionada: {values[0]} - {values[1]}</Text>
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              min={0}
              max={1000}
              value={values}
              onChange={(val: [number, number]) => setValues(val)}
              renderTrack={(props, state) => {
                const trackClasses = ['example-track'];
                if (state.index === 1) {
                  trackClasses.push('example-track-middle');
                }
                return <div {...props} className={trackClasses.join(' ')} />;
              }}
              withTracks={true}
              pearling
              minDistance={0}
            />
          </Box>
        </MenuList>
      </Menu>
    );
};

export default SliderMenu;
