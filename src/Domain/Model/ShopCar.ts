import { Attributes } from "./Product"


export interface ShopCar{
    products: ProductShopCar[]
}

export interface ProductShopCar extends Attributes{
    product_id: string;
    image_link: string;
    name: string;
    price: number;
    discount_price: number;
    discount_percent: number;
}