import { ReactNode, createContext, useContext, useState } from "react";
import { Product, ProductGet, ProductPag, ProductPost, ProductPut } from "../../Domain/Model/Product";
import ProductAPIDataSourceImpl from "../../Data/API/ProductAPIDataSource";

interface RaffleContextProps {
  getProducts(params?: ProductGet): Promise<void>
  getProductsPag(params?: ProductGet): Promise<void>
  postProducts(data: ProductPost): Promise<void>
  putProducts(data: ProductPut): Promise<void>
  deleteProducts(id: string): Promise<void>
  onChangeValue(id: string): void
  Products: Product[]
  ProductsPag: Omit<ProductPag, 'products'>
  Product: Product | undefined
}

interface Props {
  children: ReactNode;
}

const RaffleContext = createContext({} as RaffleContextProps);

function RaffleProvider({ children }: Props) {
  const [Products, setProducts] = useState<Product[]>([]);
  const [ProductsPag, setProductsPag] = useState<Omit<ProductPag, 'products'>>({} as Omit<ProductPag, 'products'>);
  const [Product, setProduct] = useState<Product>();

  const productsDataSourceImpl = new ProductAPIDataSourceImpl();


  async function getProducts(params?: ProductGet) {
    setProducts(await productsDataSourceImpl.getProducts(params));
  }
  async function getProductsPag(params?: ProductGet) {
    let data = await productsDataSourceImpl.getProductsPag(params)
    const { products, ...restData } = data
    setProductsPag(restData);
    setProducts(products);
  }
  async function postProducts(data: ProductPost) {
    setProduct(await productsDataSourceImpl.postProducts(data));
  }
  async function putProducts(data: ProductPut) {
    setProduct(await productsDataSourceImpl.putProducts(data));
  }
  async function deleteProducts(id: string) {
    setProduct(await productsDataSourceImpl.deleteProducts(id));
    await getProducts()
  }

  function onChangeValue(id: string) {
    setProduct({} as Product)
    let Product = Products.find(item => item.id === id)

    setProduct(Product);
  }



  return (
    <RaffleContext.Provider value={{
      getProducts,
      getProductsPag,
      postProducts,
      putProducts,
      deleteProducts,
      onChangeValue,
      Products,
      ProductsPag,
      Product
    }}>
      {children}
    </RaffleContext.Provider>
  );

}

const Raffle = (): RaffleContextProps => {
  const context = useContext(RaffleContext);

  if (!context) {
    throw new Error("");
  }

  return context;
};

export { Raffle, RaffleProvider };

