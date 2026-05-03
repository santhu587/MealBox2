import { useLang } from '../context/LangContext';
import useReveal from '../hooks/useReveal';

export default function About() {
  const { t } = useLang();
  useReveal();

  const stats = [
    { num: '2023', label: t['stat_founded'] },
    { num: '2', label: t['stat_kitchens'] },
    { num: '50+', label: t['stat_menu'] },
    { num: '200+', label: t['stat_clients'] },
  ];

  return (
    <div className="about-grid">
      <div className="reveal">
        <div className="section-eyebrow">{t['about_label']}</div>
        <h3 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--white)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}
          dangerouslySetInnerHTML={{ __html: t['about_title'] }} />
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.92rem', marginBottom: 12 }}>{t['about_p1']}</p>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.92rem', marginBottom: 28 }}>{t['about_p2']}</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
          <a href="#order" className="btn btn-primary"
            onClick={e => { e.preventDefault(); document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' }); }}>
            {t['btn_try']}
          </a>
          <a href="#b2b" className="btn btn-outline"
            onClick={e => { e.preventDefault(); document.getElementById('b2b')?.scrollIntoView({ behavior: 'smooth' }); }}>
            {t['btn_partner']}
          </a>
        </div>

        <div className="founder-card reveal">
          <div className="founder-avatar-el">SC</div>
          <div>
            <div className="founder-role" style={{ marginBottom: 2 }}>{t['about_label']}</div>
            <div className="founder-name">Sandeep Chandra</div>
            <div className="founder-bio" style={{ marginTop: 6 }}>3+ years in the hotel & food industry. Built MealBox Bengaluru to fix Bengaluru's food delivery problem — one order at a time.</div>
            <a href="mailto:sandeep@mealboxbengaluru.in" className="btn btn-outline btn-sm" style={{ marginTop: 12 }}>Contact Founder →</a>
          </div>
        </div>
      </div>

      <div className="reveal reveal-delay-2">
        <div className="about-stats-grid">
          {stats.map(s => (
            <div key={s.label} className="about-stat-box">
              <div className="about-stat-num">{s.num}</div>
              <div className="about-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
