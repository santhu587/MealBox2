import { useLang } from '../context/LangContext';
import useReveal from '../hooks/useReveal';

const ZONES_ACTIVE = ['Koramangala', 'HSR Layout', 'Indiranagar', 'Whitefield', 'Marathahalli', 'Electronic City'];

export default function B2B({ onToast }) {
  const { t } = useLang();
  useReveal();

  const features = [
    { icon: '🏢', title: 'feat1_title', desc: 'feat1_desc' },
    { icon: '🎉', title: 'feat2_title', desc: 'feat2_desc', delay: 1 },
    { icon: '📦', title: 'feat3_title', desc: 'feat3_desc', delay: 2 },
    { icon: '🤝', title: 'feat4_title', desc: 'feat4_desc', delay: 3 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onToast("Request received! We'll call you within 2 hours.");
    e.target.reset();
  };

  return (
    <section className="b2b-section" id="b2b">
      <div className="b2b-grid">
        <div>
          <div className="section-eyebrow reveal">{t['b2b_label']}</div>
          <h2 className="section-title reveal" dangerouslySetInnerHTML={{ __html: t['b2b_title'] }} />
          <p className="section-sub reveal">{t['b2b_sub']}</p>

          <div className="b2b-features" style={{ marginTop: 36 }}>
            {features.map(f => (
              <div key={f.icon} className={`feature-item reveal${f.delay ? ` reveal-delay-${f.delay}` : ''}`}>
                <div className="feature-icon">{f.icon}</div>
                <div>
                  <div className="feature-title">{t[f.title]}</div>
                  <div className="feature-desc">{t[f.desc]}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="zones-bar" style={{ marginTop: 28 }}>
            {ZONES_ACTIVE.map(z => (
              <div key={z} className="zone-chip active"><span className="z-dot"></span>{z}</div>
            ))}
            <div className="zone-chip"><span className="z-dot"></span>+42 more zones</div>
          </div>
        </div>

        <div className="b2b-card reveal">
          <div className="b2b-form-title">{t['b2b_form_title']}</div>
          <div className="b2b-form-sub">{t['b2b_form_sub']}</div>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group"><label>{t['b2b_contact']}</label><input type="text" placeholder="Priya Sharma" required /></div>
              <div className="form-group"><label>{t['b2b_phone']}</label><input type="tel" placeholder="+91 98765 43210" required /></div>
            </div>
            <div className="form-group"><label>{t['b2b_company']}</label><input type="text" placeholder="Infosys BPM, Startup XYZ..." required /></div>
            <div className="form-row">
              <div className="form-group">
                <label>{t['b2b_people']}</label>
                <select required>
                  <option value="">{t['b2b_people_select']}</option>
                  {['10 – 25', '25 – 50', '50 – 100', '100 – 250', '250 – 500', '500+'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>{t['b2b_type']}</label>
                <select required>
                  <option value="">{t['b2b_type_select']}</option>
                  {['b2b_type_daily', 'b2b_type_event', 'b2b_type_tiffin', 'b2b_type_party', 'b2b_type_white'].map(k => (
                    <option key={k}>{t[k]}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group"><label>{t['b2b_location']}</label><input type="text" placeholder="Whitefield, ITPL Main Road..." required /></div>
            <div className="form-group"><label>{t['b2b_budget']}</label><input type="text" placeholder="₹80 – ₹150 per person" /></div>
            <div className="form-group">
              <label>{t['b2b_requirements']}</label>
              <textarea rows="3" placeholder={t['b2b_requirements_ph']}></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
              {t['btn_quote']}
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: '0.78rem', color: 'var(--muted)' }}>
            Or email <span style={{ color: 'var(--lime)' }}>b2b@mealboxbengaluru.in</span>
          </div>
        </div>
      </div>
    </section>
  );
}
