import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { CgDanger } from "react-icons/cg";
import { InputHTMLAttributes } from "react";
import { Button, useColorMode } from "@chakra-ui/react";
import './RaffleButton.css'
import { IoTicketOutline } from "react-icons/io5";

interface RaffleButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
    labelName: string;
    full: boolean;
    isLoading?: boolean;
}

type PropsType = "button" | "reset" | "submit" | undefined;

export default function RaffleButton({
    labelName,
    full,
    isLoading,
    ...props
}: RaffleButtonProps) {

    const { type: propType, size: propSize, disabled , ...restProps } = props;

    return (
        <Button id='raffle-button-component' isDisabled={disabled} leftIcon={<IoTicketOutline/>} {...restProps} isLoading={isLoading} type={propType as PropsType}  size={String(propSize)} height='3rem' className={full ? 'full' : ''} background='white' >
            <span>{labelName}</span>
        </Button>
    );
}
