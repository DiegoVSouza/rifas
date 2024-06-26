/* eslint-disable no-console */
import { createContext, ReactNode, useContext, useState } from "react";
import { ProductShopCar, ShopCar } from "../../Domain/Model/ShopCar";

interface ShopCarContextProps {
    onAddProduct: (productShopCar: ProductShopCar) => void;
    onChangeShopCarProduct: (id: string, quantity: number) => void;
    onRemoveProduct: (id: string) => void;
    setRaffleId: (id: string) => void;
    raffleId: string;
    ShopCar: ShopCar
}

interface Props {
    children: ReactNode;
}

const ShopCarContext = createContext({} as ShopCarContextProps);

function ShopCarProvider({ children }: Props) {
    const [raffleId, setRaffleId] = useState('')
    const [ShopCar, setShopCar] = useState<ShopCar>(() => {
        let shopLocal = localStorage.getItem('@shopCar')
        if (shopLocal) {
            return JSON.parse(shopLocal)
        }
        return undefined
    });

    function onAddProduct(productShopCar: ProductShopCar) {
        if (ShopCar) {
            let products = ShopCar.products
            let newProducts = [...products]
            newProducts.push(productShopCar)
            ShopCar.products = newProducts
            localStorage.setItem("@shopCar", JSON.stringify(ShopCar))
            setShopCar(ShopCar);
        } else {
            let newProducts = []
            newProducts.push(productShopCar)
            let shopcar = { products: newProducts }
            localStorage.setItem("@shopCar", JSON.stringify(shopcar))
            setShopCar(shopcar);
        }
    }

    function onChangeShopCarProduct(id: string, quantity: number) {
        if (ShopCar) {
            let products = ShopCar.products
            products.map(item => {
                if (item.id === id)
                    item.qtd = quantity
            })
            ShopCar.products = products
            localStorage.setItem("@shopCar", JSON.stringify(ShopCar))
            setShopCar(ShopCar);
        }
    }

    function onRemoveProduct(id: string) {
        if (ShopCar) {
            let newProducts = ShopCar.products.filter(item => item.id !== id)
            let newShopCar = { products: newProducts }
            localStorage.setItem("@shopCar", JSON.stringify(newShopCar))
            setShopCar(newShopCar)
        }
    }

    return (
        <ShopCarContext.Provider value={{
            onAddProduct,
            onChangeShopCarProduct,
            onRemoveProduct,
            setRaffleId,
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
