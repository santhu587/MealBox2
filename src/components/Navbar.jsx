import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import { useCart } from '../context/CartContext';

export default function Navbar({ onCartOpen }) {
  const { lang, setLang, t } = useLang();
  const { cart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { href: '#menu', key: 'nav_menu' },
    { href: '#order', key: 'nav_order' },
    { href: '#b2b', key: 'nav_b2b' },
    { href: '#delivery', key: 'nav_delivery' },
    { href: '#about', key: 'nav_about' },
  ];

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const LangButtons = () => (
    <>
      {['en', 'kn', 'hi'].map(l => (
        <button key={l} className={`lang-btn${lang === l ? ' active' : ''}`} data-lang={l} onClick={() => setLang(l)}>
          {l === 'en' ? 'EN' : l === 'kn' ? (
            <><span className="kn-flag"><div className="kn-flag-yellow"></div><div className="kn-flag-red"></div></span>ಕನ್ನಡ</>
          ) : 'हि'}
        </button>
      ))}
    </>
  );

  return (
    <>
      {/* Karnataka badge */}
      {lang === 'kn' && (
        <div className="kn-badge show" id="knBadge">
          <div className="kn-badge-flag">
            <div style={{ background: '#F7D000', height: 7, width: 22 }}></div>
            <div style={{ background: '#CC0000', height: 7, width: 22 }}></div>
          </div>
          ಕರ್ನಾಟಕ ರಾಜ್ಯೋತ್ಸವ
        </div>
      )}

      {/* Mobile menu */}
      <nav className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobileMenu">
        <button className="mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
        {navLinks.map(l => (
          <a key={l.href} href={l.href} onClick={e => { e.preventDefault(); scrollTo(l.href); }}>{t[l.key]}</a>
        ))}
        <div className="mobile-lang" style={{ marginTop: 24 }}><LangButtons /></div>
        <a href="#b2b" className="btn btn-primary" style={{ marginTop: 16, justifyContent: 'center' }}
          onClick={e => { e.preventDefault(); scrollTo('#b2b'); }}>{t['nav_partner']}</a>
      </nav>

      {/* Main navbar */}
      <nav id="mainNav" className={scrolled ? 'scrolled' : ''}>
        <a href="#" className="nav-logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <div className="logo-mark">📦</div>
          <div className="brand">MealBox<span> Bengaluru</span></div>
        </a>

        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={e => { e.preventDefault(); scrollTo(l.href); }}>{t[l.key]}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <div className="lang-switcher"><LangButtons /></div>
          <a href="tel:+918618882449" className="btn btn-ghost">{t['nav_call']}</a>
          <a href="#order" className="btn btn-primary" onClick={e => { e.preventDefault(); scrollTo('#order'); }}>{t['nav_order_now']}</a>

          {cart.count > 0 && (
            <button onClick={onCartOpen} style={{ background: 'var(--lime)', border: 'none', borderRadius: 'var(--radius)', padding: '6px 14px', color: '#000', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
              🛒 {cart.count}
            </button>
          )}

          <div className="hamburger" onClick={() => setMenuOpen(true)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>
    </>
  );
}
