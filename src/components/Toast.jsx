import { useEffect } from 'react';

export default function Toast({ message, visible, onHide }) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onHide, 2500);
      return () => clearTimeout(t);
    }
  }, [visible, onHide]);

  return (
    <div className={`toast${visible ? ' show' : ''}`}>
      <span>✅</span>
      <span className="toast-msg">{message}</span>
    </div>
  );
}
