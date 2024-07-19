/* eslint-disable no-console */
import { createContext, ReactNode, useContext, useState } from "react";
import {  ShopCar } from "../../Domain/Model/ShopCar";
import { Numbers } from "../../Domain/Model/Raffle";

interface ShopCarContextProps {
    onAddNumber: (productShopCar: Numbers) => void;
    onChangeShopCarProduct: (id: string, quantity: number) => void;
    onRemoveProduct: (id: string) => void;
    handleSetraffle_id: (id: string) => void;
    raffle_id: string;
    ShopCar: ShopCar
}

interface Props {
    children: ReactNode;
}

const ShopCarContext = createContext({} as ShopCarContextProps);

function ShopCarProvider({ children }: Props) {
    const [raffle_id, setraffle_id] = useState(() => {
        let shopLocal = localStorage.getItem('@raffle_id')
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
            let numbers = ShopCar.quotas
            let newProducts = [...numbers]
            newProducts.push(number)
            ShopCar.quotas = newProducts
            localStorage.setItem("@shopCar", JSON.stringify(ShopCar))
            setShopCar(ShopCar);
        } else {
            let newNumbers = []
            newNumbers.push(number)
            let shopcar = { quotas: newNumbers }
            localStorage.setItem("@shopCar", JSON.stringify(shopcar))
            setShopCar(shopcar);
        }
    }

    function onChangeShopCarProduct(id: string, quantity: number) {
        if (ShopCar) {
            let numbers = ShopCar.quotas
            numbers.map(item => {
                if (item.id === id)
                    onRemoveProduct(id)
            })
            ShopCar.quotas = numbers
            localStorage.setItem("@shopCar", JSON.stringify(ShopCar))
            setShopCar(ShopCar);
        }
    }

    function onRemoveProduct(id: string) {
        if (ShopCar) {
            let newNumbers = ShopCar.quotas.filter(item => item.id !== id)
            let newShopCar = { quotas: newNumbers }
            localStorage.setItem("@shopCar", JSON.stringify(newShopCar))
            setShopCar(newShopCar)
        }
    }

    function handleSetraffle_id(id:string){
        localStorage.setItem("@raffle_id", JSON.stringify(id))
        setraffle_id(id)
    }

    return (
        <ShopCarContext.Provider value={{
            onAddNumber,
            onChangeShopCarProduct,
            onRemoveProduct,
            handleSetraffle_id,
            raffle_id,
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
