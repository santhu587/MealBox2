import { useState } from 'react';
import { useLang } from '../context/LangContext';
import { useCart } from '../context/CartContext';
import { dishes } from '../data/dishes';
import useReveal from '../hooks/useReveal';

const BADGE_MAP = {
  bestseller: { cls: 'badge-bestseller', label: '🔥 Bestseller' },
  new: { cls: 'badge-new', label: '✨ New' },
  combo: { cls: 'badge-bestseller', label: '💰 Combo' },
};

export default function Menu({ onToast }) {
  const { t } = useLang();
  const { addToCart } = useCart();
  const [filter, setFilter] = useState('all');
  const [foodCat, setFoodCat] = useState('all');
  useReveal();

  const tabs = [
    { key: 'all', label: t['tab_all'] },
    { key: 'veg', label: t['tab_veg'] },
    { key: 'nonveg', label: t['tab_nonveg'] },
    { key: 'bestseller', label: t['tab_bestseller'] },
    { key: 'under200', label: t['tab_under200'] },
  ];

  const catPills = [
    { key: 'all', icon: '🍽️', label: t['cat_all'] },
    { key: 'momo', icon: '🥟', label: t['cat_momo'] },
    { key: 'biryani', icon: '🍛', label: t['cat_biryani'] },
    { key: 'noodles', icon: '🍜', label: t['cat_noodles'] },
    { key: 'rolls', icon: '🫔', label: t['cat_rolls'] },
    { key: 'snacks', icon: '🍟', label: t['cat_snacks'] },
    { key: 'drinks', icon: '🥤', label: t['cat_drinks'] },
  ];

  const isVisible = (d) => {
    let show = true;
    if (filter === 'veg') show = d.category === 'veg';
    else if (filter === 'nonveg') show = d.category === 'nonveg';
    else if (filter === 'bestseller') show = d.badge === 'bestseller';
    else if (filter === 'under200') show = d.price < 200;
    if (show && foodCat !== 'all') show = d.food === foodCat;
    return show;
  };

  const handleAdd = (d) => {
    addToCart(d.name, d.price, d.emoji);
    onToast(`${d.emoji} ${d.name} added!`);
  };

  return (
    <section className="menu-section" id="menu">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div className="section-eyebrow reveal">{t['menu_label']}</div>
          <h2 className="section-title reveal" dangerouslySetInnerHTML={{ __html: t['menu_title'] }} />
          <p className="section-sub reveal">{t['menu_sub']}</p>
        </div>
        <div className="reveal" style={{ paddingTop: 8 }}>
          <a href="#order" className="btn btn-outline"
            onClick={e => { e.preventDefault(); document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' }); }}>
            {t['menu_view_all']}
          </a>
        </div>
      </div>

      {/* Category pills */}
      <div className="category-strip reveal" style={{ marginTop: 36 }}>
        {catPills.map(p => (
          <div key={p.key} className={`cat-pill${foodCat === p.key ? ' active' : ''}`}
            onClick={() => { setFoodCat(p.key); setFilter('all'); }}>
            <span>{p.icon}</span> <span>{p.label}</span>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="menu-tabs" style={{ marginTop: 20 }}>
        {tabs.map(tab => (
          <button key={tab.key} className={`tab${filter === tab.key ? ' active' : ''}`}
            onClick={() => { setFilter(tab.key); setFoodCat('all'); }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dishes grid */}
      <div className="dishes-grid" id="dishesGrid">
        {dishes.map((d, i) => {
          const visible = isVisible(d);
          const delay = i % 3;
          return (
            <div key={d.id}
              className={`dish-card reveal${delay ? ` reveal-delay-${delay}` : ''}`}
              data-category={d.category}
              style={{
                opacity: visible ? undefined : '0.2',
                transform: visible ? undefined : 'scale(0.97)',
                pointerEvents: visible ? undefined : 'none',
                ...(d.highlight ? { borderColor: 'rgba(149,191,70,0.2)' } : {}),
              }}>
              <div className="dish-img" style={{ background: d.bg }}>
                {d.emoji}
                {d.badge && <span className={`dish-badge ${BADGE_MAP[d.badge].cls}`}>{BADGE_MAP[d.badge].label}</span>}
              </div>
              <div className="dish-info">
                <div className="dish-header">
                  <div className="dish-name">
                    <span className={`veg-dot ${d.category}`}></span>
                    {d.name}
                  </div>
                  <div className="dish-rating">★ {d.rating}</div>
                </div>
                <div className="dish-desc">{d.desc}</div>
                <div className="dish-footer">
                  <div className="dish-price">
                    {d.originalPrice && <span className="original">₹{d.originalPrice}</span>}
                    ₹{d.price}
                  </div>
                  <button className="add-btn" onClick={() => handleAdd(d)}>+</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
