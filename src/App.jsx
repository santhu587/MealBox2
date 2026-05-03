import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Ticker from './components/Ticker';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Menu from './components/Menu';
import Order from './components/Order';
import B2B from './components/B2B';
import Delivery from './components/Delivery';
import Testimonials from './components/Testimonials';
import About from './components/About';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CartFloat from './components/CartFloat';
import CartModal from './components/CartModal';
import OrderModal from './components/OrderModal';
import Toast from './components/Toast';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = useCallback((msg) => {
    setToast({ visible: true, message: msg });
  }, []);

  const hideToast = useCallback(() => {
    setToast(t => ({ ...t, visible: false }));
  }, []);

  return (
    <>
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <Ticker />
      <Hero />
      <HowItWorks />
      <Menu onToast={showToast} />
      <Order onToast={showToast} onOrderSuccess={() => setOrderSuccess(true)} />
      <B2B onToast={showToast} />
      <Delivery />
      <Testimonials />
      <section className="testimonials-section" style={{ paddingTop: 0 }}>
        <About />
      </section>
      <CTA />
      <Footer />

      <CartFloat onClick={() => setCartOpen(true)} />
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
      <OrderModal open={orderSuccess} onClose={() => setOrderSuccess(false)} />
      <Toast message={toast.message} visible={toast.visible} onHide={hideToast} />
    </>
  );
}
