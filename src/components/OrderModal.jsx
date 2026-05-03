export default function OrderModal({ open, onClose }) {
  return (
    <div className={`modal-overlay${open ? ' open' : ''}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ textAlign: 'center' }}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div style={{ fontSize: '3.5rem', marginBottom: 14 }}>🎉</div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--white)', marginBottom: 8, letterSpacing: '-0.02em' }}>Order Placed!</h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 20 }}>
          Your order has been received. Our team will confirm on WhatsApp/SMS in the next 2 minutes.
        </p>
        <div className="highlight-box" style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: 'var(--lime)', fontSize: '0.95rem' }}>Estimated delivery: 25–35 min 🛵</div>
        </div>
        <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>
          Track Order
        </button>
      </div>
    </div>
  );
}
