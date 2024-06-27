/* eslint-disable no-console */
import { createContext, ReactNode, useContext, useState } from "react";
import {  ShopCar } from "../../Domain/Model/ShopCar";
import { Numbers } from "../../Domain/Model/Raffle";

interface ShopCarContextProps {
    onAddNumber: (productShopCar: Numbers) => void;
    onChangeShopCarProduct: (id: string, quantity: number) => void;
    onRemoveProduct: (id: string) => void;
    handleSetRaffleId: (id: string) => void;
    raffleId: string;
    ShopCar: ShopCar
}

interface Props {
    children: ReactNode;
}

const ShopCarContext = createContext({} as ShopCarContextProps);

function ShopCarProvider({ children }: Props) {
    const [raffleId, setRaffleId] = useState(() => {
        let shopLocal = localStorage.getItem('@raffleId')
        if (shopLocal) {
            return JSON.parse(shopLocal)
        }
        return undefined
    });
    const [ShopCar, setShopCar] = useState<ShopCar>(() => {
        let shopLocal = localStorage.getItem('@shopCar')
        if (shopLocal) {
            return JSON.parse(shopLocal)
        }
        return undefined
    });

    function onAddNumber(number: Numbers) {
        if (ShopCar) {
            let numbers = ShopCar.numbers
            let newProducts = [...numbers]
            newProducts.push(number)
            ShopCar.numbers = newProducts
            localStorage.setItem("@shopCar", JSON.stringify(ShopCar))
            setShopCar(ShopCar);
        } else {
            let newNumbers = []
            newNumbers.push(number)
            let shopcar = { numbers: newNumbers }
            localStorage.setItem("@shopCar", JSON.stringify(shopcar))
            setShopCar(shopcar);
        }
    }

    function onChangeShopCarProduct(id: string, quantity: number) {
        if (ShopCar) {
            let numbers = ShopCar.numbers
            numbers.map(item => {
                if (item.id === id)
                    onRemoveProduct(id)
            })
            ShopCar.numbers = numbers
            localStorage.setItem("@shopCar", JSON.stringify(ShopCar))
            setShopCar(ShopCar);
        }
    }

    function onRemoveProduct(id: string) {
        if (ShopCar) {
            let newNumbers = ShopCar.numbers.filter(item => item.id !== id)
            let newShopCar = { numbers: newNumbers }
            localStorage.setItem("@shopCar", JSON.stringify(newShopCar))
            setShopCar(newShopCar)
        }
    }

    function handleSetRaffleId(id:string){
        localStorage.setItem("@raffleId", JSON.stringify(id))
        setRaffleId(id)
    }

    return (
        <ShopCarContext.Provider value={{
            onAddNumber,
            onChangeShopCarProduct,
            onRemoveProduct,
            handleSetRaffleId,
            raffleId,
            ShopCar
        }}>
            {children}
        </ShopCarContext.Provider>
    );
}

const useShopCar = (): ShopCarContextProps => {
    const context = useContext(ShopCarContext);

    if (!context) {
        throw new Error("");
    }

    return context;
};

export { useShopCar, ShopCarProvider };
