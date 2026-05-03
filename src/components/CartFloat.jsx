import { useCart } from '../context/CartContext';

export default function CartFloat({ onClick }) {
  const { cart } = useCart();
  return (
    <div className={`cart-float${cart.count > 0 ? ' visible' : ''}`} onClick={onClick}>
      <span>🛒</span>
      <span><span>{cart.count}</span> items</span>
      <span>|</span>
      <span>₹{cart.total}</span>
    </div>
  );
}
