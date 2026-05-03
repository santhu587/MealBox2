import { useCart } from '../context/CartContext';

export default function CartModal({ open, onClose }) {
  const { cart, updateQty, removeFromCart } = useCart();

  return (
    <div className={`modal-overlay${open ? ' open' : ''}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--white)', marginBottom: 20, letterSpacing: '-0.02em' }}>
          Your Cart 🛒
        </h3>

        {cart.items.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--muted)', padding: 24 }}>Your cart is empty</p>
        ) : (
          <>
            {cart.items.map(item => (
              <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)', gap: 12 }}>
                <span style={{ flex: 1, minWidth: 0 }}>
                  {item.emoji} <strong style={{ color: 'var(--white)' }}>{item.name}</strong>
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <button onClick={() => updateQty(item.name, -1)} style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--raised)', border: '1px solid var(--border)', color: 'var(--white)', cursor: 'pointer', fontSize: '1rem' }}>−</button>
                  <span style={{ fontFamily: "'Space Mono',monospace", minWidth: 18, textAlign: 'center' }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.name, 1)} style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--raised)', border: '1px solid var(--border)', color: 'var(--white)', cursor: 'pointer', fontSize: '1rem' }}>+</button>
                  <span style={{ fontFamily: "'Space Mono',monospace", color: 'var(--saffron)', minWidth: 54, textAlign: 'right' }}>₹{item.price * item.qty}</span>
                  <button onClick={() => removeFromCart(item.name)} style={{ background: 'none', border: 'none', color: 'var(--dim)', cursor: 'pointer', fontSize: '1rem', padding: '0 2px' }} title="Remove">✕</button>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0 8px', fontWeight: 700, fontSize: '1.1rem' }}>
              <span>Total</span>
              <span style={{ fontFamily: "'Space Mono',monospace", color: 'var(--saffron)' }}>₹{cart.total}</span>
            </div>
          </>
        )}

        <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}
          onClick={() => { onClose(); document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' }); }}>
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
}
