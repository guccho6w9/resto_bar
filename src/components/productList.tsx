import React, { useState } from 'react';
import OrderForm from '@/components/orderForm'; // Asegúrate de tener el componente OrderForm creado

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOrderClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseForm = () => {
    setSelectedProduct(null);
  };

  return (
    <section id={category.toLowerCase()} className="my-8">
      <h2 
        className={`text-2xl font-bold mb-4 cursor-pointer ${isOpen ? 'bg-gray-200' : ''}`} 
        onClick={onClick}
      >
        {category}
      </h2>
      {isOpen && (
        <ul>
          {products.map((product, index) => (
            <li key={index} className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
              <div>
                <h3 className="text-2xl mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-black">Precio: ${product.price.toFixed(2)}</p>
              </div>
              <button 
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 p-2 rounded flex items-center"
                onClick={() => handleOrderClick(product)}
              >
                Pedir +
              </button>
            </li>
          ))}
        </ul>
      )}
      {selectedProduct && (
        <OrderForm 
          product={selectedProduct} 
          onClose={handleCloseForm}
        />
      )}
    </section>
  );
};

export default ProductList;
