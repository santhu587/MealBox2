import { useLang } from '../context/LangContext';

export default function Footer() {
  const { t } = useLang();

  const menuLinks = ['footer_momos', 'footer_biryani', 'footer_noodles', 'footer_rolls', 'footer_snacks', 'footer_desserts', 'footer_combos'];
  const serviceLinks = ['footer_order_online', 'footer_whatsapp', 'footer_delivery', 'footer_corporate', 'footer_event', 'footer_white', 'footer_tiffin'];
  const companyLinks = ['footer_story', 'footer_careers', 'nav_partner', 'footer_press', 'footer_privacy', 'footer_terms', 'footer_refund'];

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="brand-name">MealBox<span> Bengaluru</span></div>
          <p>{t['footer_desc']}</p>
          <address>
            📍 Cloud Kitchen #1: 12th Main, Koramangala 5th Block<br />
            📍 Cloud Kitchen #2: 27th Main, HSR Layout Sector 2<br />
            📞 +91 86188 82449 &nbsp;|&nbsp; ✉️ hello@mealboxbengaluru.in
          </address>
          <div className="social-links">
            {[['#', '📸', 'Instagram'], ['#', '👤', 'Facebook'], ['https://wa.me/918618882449', '💬', 'WhatsApp'], ['#', '🐦', 'Twitter'], ['#', '💼', 'LinkedIn']].map(([href, icon, title]) => (
              <a key={title} className="social-btn" href={href} title={title}>{icon}</a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>{t['footer_menu']}</h4>
          <ul>{menuLinks.map(k => <li key={k}><a href="#menu">{t[k]}</a></li>)}</ul>
        </div>

        <div className="footer-col">
          <h4>{t['footer_services']}</h4>
          <ul>{serviceLinks.map(k => <li key={k}><a href="#">{t[k]}</a></li>)}</ul>
        </div>

        <div className="footer-col">
          <h4>{t['footer_company']}</h4>
          <ul>{companyLinks.map(k => <li key={k}><a href="#">{t[k]}</a></li>)}</ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div>{t['footer_copyright']}</div>
        <div className="dev-credit">
          <span>{t['footer_made']}</span> <strong style={{ color: 'var(--lime)' }}>Namma Bengaluru</strong>
          &nbsp;·&nbsp; Built by <a href="https://santhoshchandra.vercel.app/" target="_blank" rel="noopener">Santhosh Chandra</a>
        </div>
      </div>
    </footer>
  );
}
