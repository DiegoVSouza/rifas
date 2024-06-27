import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CgDanger } from "react-icons/cg";
import {
    Box,
    Flex,
    FormErrorMessage,
    FormLabel,
    Input,
    FormControl,
    Text,
    useColorMode,
    Select,
    Textarea,
} from "@chakra-ui/react";
import './InputComponent.css';
import get from 'lodash/get';

interface InputComponentProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelName: string;
    inputName: string;
    isSelect?: boolean;
    options?: { value: string; label: string }[];
    width?: string;
    textArea?: boolean;
    register: UseFormRegister<any>;
    errors: FieldErrors;
}

const InputComponent: React.FC<InputComponentProps> = React.memo(({
    labelName,
    inputName,
    isSelect = false,
    options,
    width,
    register,
    errors,
    textArea,
    ...props
}) => {
    const { colorMode } = useColorMode();

    const renderInput = () => {
        if (isSelect) {
            return (
                <Select {...register(inputName)} disabled={props.disabled}>
                    <option value="">Escolha uma opção</option>
                    {options?.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </Select>
            );
        } else if (textArea) {
            return (
                <Textarea
                    disabled={props.disabled}
                    placeholder=" "
                    size={props.size ? String(props.size) : undefined}
                    {...register(inputName)}
                />
            );
        } else {
            return (
                <Input
                    placeholder=" "
                    {...props}
                    size={props.size ? String(props.size) : undefined}
                    {...register(inputName)}
                />
            );
        }
    };

    return (
        <Box
            as="section"
            m="1rem 0"
            width={width || 'auto'}
            className={errors[inputName] ? "inputError" : "inputComponent"}
        >
            <FormControl variant="floating" id={inputName} isInvalid={!!get(errors, inputName)?.message}>
                {renderInput()}
                <FormLabel
                    color={colorMode === "light" ? "black !important" : "white !important"}
                    fontWeight="bold"
                >
                    {labelName}
                </FormLabel>
                {get(errors, inputName)?.message && (
                    <Flex w="100%" gap="0.5rem" alignItems="center">
                        <CgDanger color="red" size={18} /> 
                        <Text color="red">{get(errors, inputName)?.message as string}</Text>
                    </Flex>
                )}
            </FormControl>
        </Box>
    );
});

export default InputComponent;
