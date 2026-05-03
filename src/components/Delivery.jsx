import { useLang } from '../context/LangContext';
import useReveal from '../hooks/useReveal';

const ZONES = [
  'Koramangala', 'HSR Layout', 'Indiranagar', 'BTM Layout', 'Jayanagar', 'JP Nagar',
  'Bellandur', 'Marathahalli', 'Whitefield', 'Electronic City', 'Bommanahalli', 'Domlur',
  'Sarjapur Road', 'CV Raman Nagar',
];

export default function Delivery() {
  const { t } = useLang();
  useReveal();

  const cards = [
    { icon: '🛵', title: 'del1_title', desc: 'del1_desc', time: 'del1_time' },
    { icon: '🏃', title: 'del2_title', desc: 'del2_desc', time: 'del2_time', delay: 1 },
    { icon: '🏢', title: 'del3_title', desc: 'del3_desc', time: 'del3_time', delay: 2 },
  ];

  const guarantees = [
    { icon: '⏱️', title: 'guarantee1_title', desc: 'guarantee1_desc' },
    { icon: '🌡️', title: 'guarantee2_title', desc: 'guarantee2_desc', delay: 1 },
    { icon: '📍', title: 'guarantee3_title', desc: 'guarantee3_desc', delay: 2 },
    { icon: '🔄', title: 'guarantee4_title', desc: 'guarantee4_desc', delay: 3 },
  ];

  return (
    <section className="delivery-section" id="delivery">
      <div className="section-eyebrow reveal">{t['delivery_label']}</div>
      <h2 className="section-title reveal" dangerouslySetInnerHTML={{ __html: t['delivery_title'] }} />
      <p className="section-sub reveal">{t['delivery_sub']}</p>

      <div className="delivery-grid">
        {cards.map(c => (
          <div key={c.icon} className={`delivery-card reveal${c.delay ? ` reveal-delay-${c.delay}` : ''}`}>
            <div className="delivery-icon">{c.icon}</div>
            <div className="delivery-title">{t[c.title]}</div>
            <div className="delivery-desc">{t[c.desc]}</div>
            <div className="delivery-time">{t[c.time]}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 64 }} className="reveal">
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: 6 }}
          dangerouslySetInnerHTML={{ __html: t['zones_title'] }} />
        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: 20 }}>{t['zones_sub']}</p>
        <div className="zones-bar">
          {ZONES.map(z => (
            <div key={z} className="zone-chip active"><span className="z-dot"></span>{z}</div>
          ))}
          <div className="zone-chip"><span className="z-dot"></span>+34 zones coming soon</div>
        </div>
      </div>

      <div className="guarantees-grid" style={{ marginTop: 56 }}>
        {guarantees.map(g => (
          <div key={g.icon} className={`guarantee-item reveal${g.delay ? ` reveal-delay-${g.delay}` : ''}`}>
            <div className="g-icon">{g.icon}</div>
            <div>
              <div className="guarantee-title">{t[g.title]}</div>
              <div className="guarantee-desc">{t[g.desc]}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
