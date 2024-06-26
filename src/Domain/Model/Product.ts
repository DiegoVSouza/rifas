
export interface Product {
  id: string;
  name: string
  category_id: string;
  description: string;
  large_description: string;
  price: number;
  discount_price: number;
  discount_percent: number;
  sku: string;
  attributesId: string;
  attributes: Attributes[];
  created_at: Date;
  updated_at: Date;
  is_new: boolean;

}

export interface Attributes {
  id: string;
  image_link: string;
  color: string;
  qtd: number;
  size: string;
}

export interface AttributesPost {
  image_link: string;
  color: string;
  qtd: number;
  size: string;
}

export interface AttributesPut {
  id: string
  image_link?: string;
  color?: string;
  qtd?: number;
  size?: string;
}

export interface ProductPag {
  products: Product[];
  number_of_pages: number;
  number_of_products: number;
}

export interface ProductGet {
  [key: string]: string | number | boolean | undefined;
  id?: string;
  name?: string;
  category_id?: string;
  price?: number;
  page?: number;
  discount?: boolean;
  is_new?: boolean;
  limit?: number;
  sku?: string;
  sorted_by?: string;
}

export interface ProductPost {
  name: string
  categoryId: string
  description: string;
  large_description: string;
  price: number;
  discount_price: number;
  discount_percent: number;
  sku: string;
  attributes: AttributesPost[];

  is_new: boolean;

}

export interface ProductPut {
  id: string;
  name?: string
  categoryId?: string
  description?: string;
  large_description?: string;
  price?: number;
  discount_price?: number;
  discount_percent?: number;
  sku?: string;
  attributes?: AttributesPut[];

  is_new?: boolean;
}

