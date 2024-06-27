// App.tsx
import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { apiViaCep } from '../../../Data/Services/api';
import { Flex, Text } from '@chakra-ui/react';
import { createPortal } from 'react-dom';
import './SelectCity.css'
const customStyles = {
    menuPortal: (provided: any) => ({ ...provided, zIndex: 9999 }),
    menu: (provided: any) => ({ ...provided, zIndex: 9999, overflowY: 'auto' }),
    control: (provided: any) => ({
        ...provided,
        position: 'relative',
        zIndex: 1000
    }),
    menuList: (provided: any) => ({
        ...provided,
        maxHeight: '200px',
        overflowY: 'auto'
    })
};
interface SelectCityInterface {
    setCity: (city: string) => void;
    isRow?: boolean;
}

export default function SelectCity({ setCity, isRow=false }: SelectCityInterface) {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState<any>(null);
    const [selectedCity, setSelectedCity] = useState<any>(null);

    const fetchStates = async () => {
        const { data } = await apiViaCep.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        console.log(">>>>>>>>> data", data)
        return data.map((state: any) => ({
            value: state.sigla,
            label: state.nome
        }));
    };

    const fetchCities = async (stateAbbreviation: string) => {
        const { data } = await apiViaCep.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateAbbreviation}/municipios`);
        console.log(">>>>>>>>> data city", data)
        return data.map((city: any) => ({
            value: city.nome,
            label: city.nome
        }));
    };



    useEffect(() => {
        const getStates = async () => {
            const statesData = await fetchStates();
            setStates(statesData);
        };

        getStates();
    }, []);

    const handleStateChange = async (selectedOption: any) => {
        setSelectedState(selectedOption);
        const citiesData = await fetchCities(selectedOption.value);
        setCities(citiesData);
        setSelectedCity(null); // Reset selected city when state changes
    };

    const handleCityChange = (selectedOption: any) => {
        setSelectedCity(selectedOption);
        setCity(selectedOption.value + `- ${selectedState.value}`)
    };



    return (
        <Flex direction={isRow ? 'row' : 'column'} gap={isRow ? '1rem' : '0'}>
            {!isRow && <Text fontWeight='bold'>Estado</Text>}
            <Select
                options={states}
                value={selectedState}
                onChange={handleStateChange}
                placeholder="Selecione o estado"
                isDisabled={!states.length}
                styles={customStyles}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                menuPlacement="auto"
            />

            {!isRow && <Text fontWeight='bold' mt={isRow? '0' : '1rem'}>Cidade</Text>}
            <Select
                options={cities}
                value={selectedCity}
                onChange={handleCityChange}
                placeholder="Selecione a cidade"
                isDisabled={!selectedState}
                styles={customStyles}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                menuPlacement="auto"
            />
        </Flex>
    );
};

