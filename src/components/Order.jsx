import { useState } from 'react';
import { useLang } from '../context/LangContext';
import { useCart } from '../context/CartContext';
import useReveal from '../hooks/useReveal';

function buildWhatsAppLink(cart) {
  const phone = '918618882449';
  let msg;
  if (cart.count === 0) {
    msg = "Hi MealBox Bengaluru! I'd like to place an order 🛵";
  } else {
    const lines = cart.items.map(i => `${i.emoji} ${i.name} ×${i.qty} — ₹${i.price * i.qty}`);
    msg = [
      "Hi MealBox Bengaluru! I'd like to place this order 🛵",
      '',
      ...lines,
      '',
      `*Total: ₹${cart.total}*`,
      '',
      'Please confirm my order. Thank you!',
    ].join('\n');
  }
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

export default function Order({ onToast, onOrderSuccess }) {
  const { t } = useLang();
  const { cart } = useCart();
  const [mode, setMode] = useState('online');
  useReveal();

  const modes = [
    { key: 'online', label: t['mode_online'] },
    { key: 'whatsapp', label: t['mode_whatsapp'] },
    { key: 'phone', label: t['mode_phone'] },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.count === 0) { onToast('Add dishes to your cart first!'); return; }
    onOrderSuccess();
  };

  return (
    <section className="order-section" id="order">
      <div className="section-eyebrow reveal">{t['order_label']}</div>
      <h2 className="section-title reveal" dangerouslySetInnerHTML={{ __html: t['order_title'] }} />
      <p className="section-sub reveal">{t['order_sub']}</p>

      <div style={{ marginTop: 36 }} className="reveal">
        <div className="mode-toggle">
          {modes.map(m => (
            <button key={m.key} className={`mode-btn${mode === m.key ? ' active' : ''}`}
              onClick={() => setMode(m.key)}>{m.label}</button>
          ))}
        </div>
      </div>

      {/* Online */}
      {mode === 'online' && (
        <div className="order-panel reveal" style={{ maxWidth: 640 }}>
          <div className="highlight-box" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: '1.4rem' }}>🛒</span>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--white)' }}>{t['cart_title']}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                  {cart.count > 0
                    ? `${cart.count} item${cart.count > 1 ? 's' : ''} · ₹${cart.total}`
                    : t['cart_empty']}
                </div>
              </div>
            </div>
          </div>

          <form id="d2cForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group"><label>{t['form_name']}</label><input type="text" placeholder="Ravi Kumar" required /></div>
              <div className="form-group"><label>{t['form_phone']}</label><input type="tel" placeholder="+91 98765 43210" required /></div>
            </div>
            <div className="form-group"><label>{t['form_address']}</label><input type="text" placeholder="Flat 4B, Embassy Residency, Koramangala 5th Block" required /></div>
            <div className="form-row">
              <div className="form-group"><label>{t['form_landmark']}</label><input type="text" placeholder="Near Forum Mall" /></div>
              <div className="form-group">
                <label>{t['form_time']}</label>
                <select>
                  <option>{t['form_time_asap']}</option>
                  <option>{t['form_time_later']}</option>
                </select>
              </div>
            </div>
            <div className="form-group"><label>{t['form_instructions']}</label><input type="text" placeholder="Extra spicy, less oil, no onions..." /></div>
            <div className="form-group">
              <label>{t['form_payment']}</label>
              <select required>
                <option value="">{t['form_payment_select']}</option>
                <option>{t['form_payment_upi']}</option>
                <option>{t['form_payment_card']}</option>
                <option>{t['form_payment_cod']}</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
              {t['btn_place_order']}
            </button>
          </form>
        </div>
      )}

      {/* WhatsApp */}
      {mode === 'whatsapp' && (
        <div className="order-panel" style={{ maxWidth: 480 }}>
          <div className="b2b-card reveal" style={{ textAlign: 'center', marginTop: 24 }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>💬</div>
            <div className="b2b-form-title">{t['wa_title']}</div>
            <div className="b2b-form-sub">{t['wa_sub']}</div>

            {cart.count === 0 ? (
              <div style={{ background: 'var(--raised)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '14px 16px', marginBottom: 16, fontSize: '0.85rem', color: 'var(--muted)' }}>
                No items in cart yet — add dishes from the menu above first.
              </div>
            ) : (
              <div style={{ background: 'var(--raised)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '14px 16px', marginBottom: 16, textAlign: 'left' }}>
                <div style={{ fontWeight: 700, color: 'var(--white)', marginBottom: 8, fontSize: '0.88rem' }}>Your order:</div>
                {cart.items.map(item => (
                  <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', color: 'var(--text)', padding: '3px 0' }}>
                    <span>{item.emoji} {item.name} ×{item.qty}</span>
                    <span style={{ color: 'var(--saffron)', fontFamily: "'Space Mono',monospace" }}>₹{item.price * item.qty}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid var(--border)', marginTop: 8, paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.88rem' }}>
                  <span style={{ color: 'var(--white)' }}>Total</span>
                  <span style={{ color: 'var(--saffron)', fontFamily: "'Space Mono',monospace" }}>₹{cart.total}</span>
                </div>
              </div>
            )}

            <a href={buildWhatsAppLink(cart)}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg,#25D366,#128C7E)', borderColor: '#25D366' }}>
              {t['wa_btn']}
            </a>
          </div>
        </div>
      )}

      {/* Phone */}
      {mode === 'phone' && (
        <div className="order-panel" style={{ maxWidth: 480 }}>
          <div className="b2b-card reveal" style={{ textAlign: 'center', marginTop: 24 }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>📞</div>
            <div className="b2b-form-title">{t['phone_title']}</div>
            <div className="b2b-form-sub">{t['phone_sub']}</div>
            <a href="tel:+918618882449" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginBottom: 14, fontSize: '1.1rem' }}>
              📞 +91 86188 82449
            </a>
            <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{t['phone_wait']}</div>
          </div>
        </div>
      )}
    </section>
  );
}
