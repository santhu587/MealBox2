import { useLang } from '../context/LangContext';
import useReveal from '../hooks/useReveal';

export default function CTA() {
  const { t } = useLang();
  useReveal();

  return (
    <section className="cta-section" id="cta">
      <div className="section-eyebrow reveal">{t['cta_label']}</div>
      <h2 className="section-title reveal" style={{ maxWidth: 560, margin: '0 auto 16px' }}
        dangerouslySetInnerHTML={{ __html: t['cta_title'] }} />
      <p className="section-sub reveal" style={{ textAlign: 'center', margin: '0 auto 44px' }}>{t['cta_sub']}</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }} className="reveal">
        <a href="#order" className="btn-cta-dark"
          onClick={e => { e.preventDefault(); document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' }); }}>
          {t['cta_btn']}
        </a>
        <a href="https://wa.me/918618882449" target="_blank" rel="noopener noreferrer" className="btn-cta-outline">
          {t['cta_whatsapp']}
        </a>
      </div>
      <div style={{ textAlign: 'center', marginTop: 20, fontSize: '0.82rem', color: 'rgba(10,10,10,0.6)' }} className="reveal">
        <span>{t['cta_call']}</span> <strong>+91 86188 82449</strong> &nbsp;|&nbsp; <span>{t['cta_available']}</span>
      </div>
    </section>
  );
}
