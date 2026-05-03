import { useLang } from '../context/LangContext';
import useReveal from '../hooks/useReveal';

export default function HowItWorks() {
  const { t } = useLang();
  useReveal();

  const steps = [
    { num: '01', icon: '📋', title: 'step1_title', desc: 'step1_desc' },
    { num: '02', icon: '🛒', title: 'step2_title', desc: 'step2_desc', delay: 1 },
    { num: '03', icon: '💳', title: 'step3_title', desc: 'step3_desc', delay: 2 },
    { num: '04', icon: '🛵', title: 'step4_title', desc: 'step4_desc', delay: 3 },
  ];

  return (
    <section className="how-section" id="how">
      <div className="section-eyebrow reveal">{t['how_label']}</div>
      <h2 className="section-title reveal" dangerouslySetInnerHTML={{ __html: t['how_title'] }} />
      <p className="section-sub reveal">{t['how_sub']}</p>

      <div className="how-grid" style={{ marginTop: 48 }}>
        {steps.map(s => (
          <div key={s.num} className={`step-card reveal${s.delay ? ` reveal-delay-${s.delay}` : ''}`}>
            <div className="step-num">{s.num}</div>
            <div className="step-icon">{s.icon}</div>
            <div className="step-title">{t[s.title]}</div>
            <div className="step-desc">{t[s.desc]}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
