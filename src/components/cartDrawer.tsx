// components/CartDrawer.tsx
import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/cartContext';

const CartDrawer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [newQuantity, setNewQuantity] = useState<number>(0);
  const [shippingMethod, setShippingMethod] = useState<'delivery' | 'takeaway' | null>(null);
  const [receiverName, setReceiverName] = useState('');
  const [address, setAddress] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const deliveryCost = shippingMethod === 'delivery' ? 5000 : 0;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = subtotal + deliveryCost;

  useEffect(() => {
    // Bloquea el scroll del body cuando el CartDrawer está abierto
    document.body.style.overflow = 'hidden';

    // Limpia el bloqueo del scroll cuando el CartDrawer se cierra
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleUpdateQuantity = () => {
    if (isEditing !== null && newQuantity > 0) {
      updateQuantity(isEditing, newQuantity);
      setIsEditing(null);
      setNewQuantity(0);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-white flex flex-col p-4 overflow-auto">
      <button onClick={onClose} className="text-left text-yellow-500 text-xl mb-4">
        ← Regresar
      </button>
      <h2 className="text-3xl font-bold text-center mb-4">Detalles del Pedido</h2>

      {cart.length === 0 ? (
        <p className="text-center text-lg">El carrito está vacío.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="mb-4 border-b pb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xl">{item.product.name} (x{item.quantity})</span>
              <div>
                <button
                  className="text-blue-500 mr-4"
                  onClick={() => {
                    setIsEditing(index);
                    setNewQuantity(item.quantity);
                  }}
                >
                  Editar
                </button>
                <button
                  className="text-red-500"
                  onClick={() => removeFromCart(index)}
                >
                  Eliminar
                </button>
              </div>
            </div>
            <p className="text-gray-700">Total: ${(item.product.price * item.quantity).toFixed(2)}</p>

            {isEditing === index && (
              <div className="mt-4">
                <input
                  type="number"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(Math.max(1, parseInt(e.target.value)))}
                  className="w-full p-2 border rounded-lg"
                  min="1"
                />
                <button
                  onClick={handleUpdateQuantity}
                  className="mt-2 bg-yellow-500 text-white p-2 rounded-lg w-full"
                >
                  Actualizar Cantidad
                </button>
              </div>
            )}
          </div>
        ))
      )}

      {/* Formas de Envío */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-center mb-4">Formas de Envío</h3>
        <div className="flex justify-around mb-4">
          <button
            className={`p-2 border rounded-lg w-1/3 ${
              shippingMethod === 'delivery' ? 'bg-yellow-500 text-white' : ''
            }`}
            onClick={() => setShippingMethod('delivery')}
          >
            Delivery
          </button>
          <button
            className={`p-2 border rounded-lg w-1/3 ${
              shippingMethod === 'takeaway' ? 'bg-yellow-500 text-white' : ''
            }`}
            onClick={() => setShippingMethod('takeaway')}
          >
            Take Away
          </button>
        </div>
        {shippingMethod === 'delivery' && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nombre del receptor"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <input
              type="text"
              placeholder="Dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        )}
        {shippingMethod === 'takeaway' && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nombre de quien retira"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <input
              type="text"
              placeholder="¿Cuándo lo retira?"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Formas de Pago */}
      <div className="mb-10 mt-10">
        <h3 className="text-2xl font-bold text-center mb-4">Formas de Pago</h3>
        <select
          value={paymentMethod || ''}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        >
          <option value="" disabled>
            Seleccionar método de pago
          </option>
          <option value="efectivo">Efectivo</option>
          <option value="credito">Tarjeta de Crédito</option>
          <option value="debito">Tarjeta de Débito</option>
          <option value="transferencia">Transferencia</option>
        </select>
      </div>

      {/* Subtotales y Total */}
      <div className=" left-0 right-0 bg-yellow-500 p-4 flex flex-col rounded-3xl items-center mx-auto w-11/12 md:w-2/3 lg:w-1/2 ">
        <p className="text-white text-xl mb-2">Subtotal: ${subtotal.toFixed(2)}</p>
        <p className="text-white text-xl mb-2">Envío: ${deliveryCost.toFixed(2)}</p>
        <p className="text-white text-2xl font-bold mb-4">Total: ${total.toFixed(2)}</p>
        <button className="bg-white text-yellow-500 p-4 rounded-full font-bold w-1/2">
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;
