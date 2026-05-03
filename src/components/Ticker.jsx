const TICKER_TEXT = '🚀 FREE DELIVERY on orders above ₹299 &nbsp;•&nbsp; 🕐 30-min delivery across Bengaluru &nbsp;•&nbsp; 🏢 Corporate catering starts at ₹99/head &nbsp;•&nbsp; 🎉 New: Momos Cloud — 8 varieties! &nbsp;•&nbsp; ⭐ 4.8★ rated on Google &nbsp;•&nbsp; 🌱 Veg &amp; Non-Veg options &nbsp;•&nbsp; ❄️ Cloud Kitchen in Koramangala &amp; HSR Layout &nbsp;•&nbsp; 💰 Bulk orders for offices, events &amp; parties &nbsp;&nbsp;&nbsp;';

export default function Ticker() {
  const doubled = TICKER_TEXT + TICKER_TEXT;
  return (
    <div className="ticker">
      <div className="ticker-inner" dangerouslySetInnerHTML={{ __html: doubled }} />
    </div>
  );
}
