// components/Header.tsx
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const images = [
    '/images/banner-comida/hamburguesa.jpg',
    '/images/banner-comida/pizza.jpg',
    '/images/banner-comida/sandwich-milanesa.jpg',
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 4000); // Cambia de imagen cada 3 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [images.length]);

  return (
    <header className="relative h-64 overflow-hidden mx-md">
      <div
        className="bg-cover bg-center h-full transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      />
      <div className="absolute top-4 right-4 bg-red-500 text-white rounded-full px-3 py-1 text-sm font-bold">
        Hacemos envíos
      </div>
    </header>
  );
};

export default Header;
