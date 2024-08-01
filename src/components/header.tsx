// components/Header.tsx
import React, { useState } from 'react';

const Header: React.FC = () => {
  const images = [
    '/images/banner-comida/hamburguesa.jpg',
    '/images/banner-comida/pizza.jpg',
    '/images/banner-comida/sandwich-milanesa.jpg',
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  return (
    <header className="relative h-64 mx-md">
      <div 
        className="bg-cover bg-center h-full mx-md" 
        style={{ backgroundImage: `url(${images[currentImage]})` }}
        onClick={nextImage}
      />
      <div className="absolute top-4 right-4 bg-red-500 text-white rounded-full px-3 py-1 text-sm font-bold">
        Hacemos envíos
      </div>
    </header>
  );
};

export default Header;

