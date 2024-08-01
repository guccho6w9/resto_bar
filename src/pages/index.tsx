// pages/index.tsx
import React from 'react';
import '@/app/globals.css';
import Header from '@/components/header';
import InfoLocal from '@/components/infolocal';
import Footer from '@/components/footer';
import ProductList from '@/components/productList';
import products from '@/data/products';

const Home: React.FC = () => {
  return (
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
            <ProductList key={index} category={category} products={products[category]} />
          ))}
        </main>
      </div>

    </div>
  );
};

export default Home;
