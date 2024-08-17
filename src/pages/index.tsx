import React, { useState } from 'react';
import '@/app/globals.css';
import Header from '@/components/header';
import InfoLocal from '@/components/infolocal';
import CartButton from '@/components/cartButton';
import CartDrawer from '@/components/cartDrawer';
import ProductList from '@/components/productList';
import Footer from '@/components/footer';
import products from '@/data/products';
import { CartProvider } from '@/context/cartContext';

const Home: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCategoryClick = (category: string) => {
    setOpenCategory((prevCategory) => (prevCategory === category ? null : category));
  };

  const toggleCartDrawer = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <div className="container mx-auto lg:max-w-screen-lg">
          <Header />
        </div>
        <div className="container mx-auto lg:max-w-screen-lg">
          <InfoLocal />
        </div>
        <div className="container mx-auto lg:max-w-screen-lg flex-grow lg:border-l lg:border-r lg:border-gray-300 lg:px-4">
          <main className="p-4 flex-grow">
            {Object.keys(products).map((category, index) => (
              <ProductList
                key={index}
                category={category}
                products={products[category]}
                isOpen={openCategory === category}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </main>
        </div>
        <CartButton onClick={toggleCartDrawer} />
        {isCartOpen && <CartDrawer onClose={toggleCartDrawer} />}
      </div>
      <Footer />
    </CartProvider>
    
  );
  
};

export default Home;
