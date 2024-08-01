// components/InfoLocal.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const InfoLocal: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <img src="/images/logo/logo.png" alt="Logo del Restaurante" className="w-full h-auto " />
      <div className="flex justify-center items-center space-x-4 mt-4">
        <a href="tel:+1234567890" className="flex items-center bg-white text-black p-2 rounded">
          <FontAwesomeIcon icon={faWhatsapp} className="mr-2 text-4xl" /> {/* Clase Tailwind para tamaño */}
          
        </a>
        <a href="https://maps.google.com/?q=location" className="flex items-center bg-white text-black p-2 rounded">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-4xl" />
          
        </a>
        <span className="flex items-center bg-white text-black p-2 rounded">
          <FontAwesomeIcon icon={faClock} className="mr-2 text-4xl" />
          9am - 10pm
        </span>
      </div>
    </div>
  );
};

export default InfoLocal;
