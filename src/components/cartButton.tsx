// components/CartButton.tsx
import React from 'react';
import { useCart } from '@/context/cartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const CartButton: React.FC<{ onClick?: () => void }> = ({ onClick = () => {} }) => {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-4 right-4">
      <button
        className="bg-green-500 text-white p-4 rounded-full shadow-lg relative"
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
            {totalItems}
          </span>
        )}
      </button>
    </div>
  );
};

export default CartButton;
