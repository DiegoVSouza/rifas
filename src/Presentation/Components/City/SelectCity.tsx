// App.tsx
import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { apiViaCep } from '../../../Data/Services/api';
import { Flex, Text } from '@chakra-ui/react';
import { createPortal } from 'react-dom';
import './SelectCity.css'
import { customStyles } from '../../../main/themes/SelectTheme';

interface SelectCityInterface {
    setCity: (city: string) => void;
    city?: string;
    isRow?: boolean;
}

export default function SelectCity({ setCity, isRow = false, city }: SelectCityInterface) {
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState<any>(null);
    const [selectedCity, setSelectedCity] = useState<any>(null);

    const fetchStates = async () => {
        const { data } = await apiViaCep.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        return data.map((state: any) => ({
            value: state.sigla,
            label: state.nome
        }));
    };

    const fetchCities = async (stateAbbreviation: string) => {
        const { data } = await apiViaCep.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateAbbreviation}/municipios`);
        return data.map((city: any) => ({
            value: city.nome,
            label: city.nome
        }));
    };



    useEffect(() => {
        const getStates = async () => {
            const statesData = await fetchStates();
            setStates(statesData);
            return statesData
        };

        const loadCity = async (city: string,states: any[]) => {
            let cityStringArray = city.split("-")
            const citiesData = await fetchCities(cityStringArray[1]);
            setCities(citiesData);
            setSelectedState(states.find(item => item.value === cityStringArray[1]));
            setSelectedCity({
                value: cityStringArray[0],
                label: cityStringArray[0]
            });
        }

        getStates().then((data) => {
            if (city) {
                loadCity(city,data)
            }
        });
    }, []);

    useEffect(() => {


    }, [])


    const handleStateChange = async (selectedOption: any) => {
        setSelectedState(selectedOption);
        const citiesData = await fetchCities(selectedOption.value);
        setCities(citiesData);
        setSelectedCity(null);
    };

    const handleCityChange = (selectedOption: any) => {
        setSelectedCity(selectedOption);
        setCity(selectedOption.value + `-${selectedState.value}`)
    };



    return (
        <Flex direction={isRow ? 'row' : 'column'} zIndex={1} gap={isRow ? '1rem' : '0'} flexWrap='wrap'>
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

            {!isRow && <Text fontWeight='bold' mt={isRow ? '0' : '1rem'}>Cidade</Text>}
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

