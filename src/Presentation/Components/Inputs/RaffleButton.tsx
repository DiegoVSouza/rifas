import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { CgDanger } from "react-icons/cg";
import { InputHTMLAttributes } from "react";
import { Button, useColorMode } from "@chakra-ui/react";
import './RaffleButton.css'
import { IoTicketOutline } from "react-icons/io5";

interface RaffleButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
    labelName: string;
    full: boolean;
}

type PropsType = "button" | "reset" | "submit" | undefined;

export default function RaffleButton({
    labelName,
    full,
    ...props
}: RaffleButtonProps) {
    const { colorMode } = useColorMode();

    const { type: propType, size: propSize, ...restProps } = props;

    return (
        <Button id='raffle-button-component' leftIcon={<IoTicketOutline/>} {...restProps} type={propType as PropsType}  size={String(propSize)} height='3rem' className={full ? 'full' : ''} background='white' >
            <span>{labelName}</span>
        </Button>
    );
}
