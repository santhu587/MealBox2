import { useLang } from '../context/LangContext';
import useReveal from '../hooks/useReveal';

const REVIEWS = [
  { initial: 'R', name: 'Rahul Menon', meta: 'Software Engineer, Koramangala', stars: 5, text: '"The chicken momos are absolutely unreal. Crispy on the outside, juicy inside, and that chilli chutney is addictive. Ordered 4 times this week already!"' },
  { initial: 'P', name: 'Priya Nair', meta: 'Operations Head, Healthtech Startup', stars: 5, text: '"We use MealBox Bengaluru for all our office lunches — 60 people daily. The quality is consistent, billing is clean, and our dedicated account manager is super responsive."', delay: 1 },
  { initial: 'A', name: 'Aishwarya Reddy', meta: 'Product Manager, HSR Layout', stars: 5, text: '"Ordered the Hyderabadi Biryani at 11 PM. Arrived in 28 minutes, piping hot. That\'s just exceptional. Became a regular customer immediately."', delay: 2 },
  { initial: 'S', name: 'Suresh Babu', meta: 'Freelance Designer, Indiranagar', stars: 4, text: '"Masala Dosa Bowl is genius. Finally someone understood that we want the full experience in a delivery-friendly format. Pure Bengaluru energy in a box."' },
  { initial: 'K', name: 'Kavitha Krishnan', meta: 'Founder, B2B SaaS Startup', stars: 5, text: '"Catered our product launch for 300 guests. The Mile Combo Boxes were a massive hit. Zero complaints, smooth logistics, super professional team."', delay: 1 },
  { initial: 'V', name: 'Vikram Shetty', meta: 'Data Scientist, Whitefield', stars: 5, text: '"The Kathi Roll beats every roll place in Bengaluru. Paratha is flaky, chicken is charred perfectly. Easily my go-to late-night dinner 3x a week."', delay: 2 },
];

export default function Testimonials() {
  const { t } = useLang();
  useReveal();

  return (
    <section className="testimonials-section" id="about">
      <div className="section-eyebrow reveal">{t['testimonials_label']}</div>
      <h2 className="section-title reveal" dangerouslySetInnerHTML={{ __html: t['testimonials_title'] }} />
      <p className="section-sub reveal">{t['testimonials_sub']}</p>

      <div className="testimonials-grid">
        {REVIEWS.map(r => (
          <div key={r.name} className={`testimonial-card reveal${r.delay ? ` reveal-delay-${r.delay}` : ''}`}>
            <div className="stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
            <div className="testimonial-text">{r.text}</div>
            <div className="testimonial-author">
              <div className="author-avatar">{r.initial}</div>
              <div>
                <div className="author-name">{r.name}</div>
                <div className="author-meta">{r.meta}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
