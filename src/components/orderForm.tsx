// components/OrderForm.tsx
import React, { useState } from 'react';
import { useCart } from '@/context/cartContext';

interface OrderFormProps {
  product: { name: string; price: number; description: string };
  onClose: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(0);
  const [notes, setNotes] = useState("");
  const { addToCart } = useCart();

  const handleQuantityChange = (change: number) => {
    setQuantity((prevQuantity) => Math.max(0, prevQuantity + change));
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({ product, quantity, notes });
      onClose();
    }
  };

  const total = product.price * quantity;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">{product.name}</h2>
        <p className="text-gray-700 mb-6 text-center">{product.description}</p>
        <div className="flex items-center justify-center mb-6">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-xl p-3 rounded-full transition-colors duration-300"
            onClick={() => handleQuantityChange(-1)}
          >
            -
          </button>
          <span className="mx-6 text-2xl">{quantity}</span>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-xl p-3 rounded-full transition-colors duration-300"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notas adicionales"
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <div className="text-right font-bold text-lg mb-6">
          Total: ${total.toFixed(2)}
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddToCart}
            disabled={quantity === 0}
            className={`px-6 py-3 rounded-lg ${quantity > 0 ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-300'} text-white`}
          >
            Confirmar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
