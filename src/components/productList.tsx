// components/ProductList.tsx
import React from 'react';

interface Product {
  name: string;
  price: number;
  description: string;
}

interface ProductListProps {
  category: string;
  products: Product[];
  isOpen: boolean;
  onClick: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ category, products, isOpen, onClick }) => {
  return (
    <section id={category.toLowerCase()} className="my-8">
      <h2 
        className={`text-2xl font-bold mb-4 cursor-pointer $`} 
        onClick={onClick}
      >
        {category}
      </h2>
      {isOpen && (
        <ul>
          {products.map((product, index) => (
            <li key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <h3 className="text-2xl mb-2">{product.name}</h3>
              <p className="text-gray-700 mb-2"> {product.description}</p>
              <p className="text-black">Precio: ${product.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProductList;
