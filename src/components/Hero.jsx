import { useEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';

export default function Hero() {
  const { t } = useLang();
  const countersRan = useRef(false);

  useEffect(() => {
    const targets = [
      { el: document.getElementById('ctr-orders'), target: 12000 },
      { el: document.getElementById('ctr-zones'), target: 48 },
      { el: document.getElementById('ctr-delivery'), target: 30 },
    ];

    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countersRan.current) {
        countersRan.current = true;
        targets.forEach(({ el, target }) => {
          if (!el) return;
          let current = 0;
          const step = target / (1500 / 16);
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current).toLocaleString('en-IN');
            if (current >= target) clearInterval(timer);
          }, 16);
        });
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(statsSection);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-bg-glow"></div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="dot"></span>
          <span>{t['hero_badge']}</span>
        </div>

        <h1 dangerouslySetInnerHTML={{ __html: t['hero_h1'] }} />

        <p>{t['hero_p']}</p>

        <div className="hero-actions">
          <a href="#order" className="btn btn-primary btn-lg"
            onClick={e => { e.preventDefault(); document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' }); }}>
            {t['hero_btn_order']}
          </a>
          <a href="#b2b" className="btn btn-outline btn-lg"
            onClick={e => { e.preventDefault(); document.getElementById('b2b')?.scrollIntoView({ behavior: 'smooth' }); }}>
            {t['hero_btn_b2b']}
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="number"><span id="ctr-orders">0</span><span>+</span></div>
            <div className="label">{t['stat_orders']}</div>
          </div>
          <div className="stat-item">
            <div className="number"><span id="ctr-zones">0</span><span>+</span></div>
            <div className="label">{t['stat_zones']}</div>
          </div>
          <div className="stat-item">
            <div className="number">4.8<span>★</span></div>
            <div className="label">{t['stat_rating']}</div>
          </div>
          <div className="stat-item">
            <div className="number"><span id="ctr-delivery">0</span><span>min</span></div>
            <div className="label">{t['stat_delivery']}</div>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="food-cell">🫔</div>
        <div className="food-cell">🍜</div>
        <div className="food-cell">🥟</div>
        <div className="food-cell">🍛</div>
      </div>
    </section>
  );
}
