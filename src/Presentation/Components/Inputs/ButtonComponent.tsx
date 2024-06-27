import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { CgDanger } from "react-icons/cg";
import { InputHTMLAttributes } from "react";
import { Button, useColorMode } from "@chakra-ui/react";
import './ButtonComponent.css'

interface ButtonComponentProps extends InputHTMLAttributes<HTMLButtonElement> {
    labelName: string;
    full: boolean;
    isLoading?: boolean;
}

type PropsType = "button" | "reset" | "submit" | undefined;

export default function ButtonComponent({
    labelName,
    full,
    isLoading,
    ...props
}: ButtonComponentProps) {

    const { type: propType, size: propSize, disabled , ...restProps } = props;

    return (
        <Button id='button-component' isDisabled={disabled} {...restProps} isLoading={isLoading} type={propType as PropsType}  size={String(propSize)} height='3rem' className={full ? 'full' : ''} background='white' >
            <span>{labelName}</span>
        </Button>
    );
}
