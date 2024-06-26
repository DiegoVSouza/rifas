import { Product, ProductGet, ProductPag, ProductPost, ProductPut } from "../../Domain/Model/Product";

export default interface ProductDataSource {
  getProducts(params?: ProductGet): Promise<Product[]>;
  getProductsPag(params?: ProductGet): Promise<ProductPag>;
  postProducts(data:ProductPost): Promise<Product>;
  putProducts(data:ProductPut): Promise<Product>;
  deleteProducts(id:string): Promise<Product>;
}
