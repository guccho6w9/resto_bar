// data/products.ts
export interface Product {
    name: string;
    price: number;
  }
  
  export interface Products {
    [category: string]: Product[];
  }
  
  import productsData from './products.json';
  
  const products: Products = productsData;
  
  export default products;
  