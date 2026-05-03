import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.name === action.payload.name);
      const items = existing
        ? state.items.map(i => i.name === action.payload.name ? { ...i, qty: i.qty + 1 } : i)
        : [...state.items, { ...action.payload, qty: 1 }];
      return recalc(items);
    }
    case 'UPDATE_QTY': {
      const items = state.items
        .map(i => i.name === action.name ? { ...i, qty: Math.max(0, i.qty + action.delta) } : i)
        .filter(i => i.qty > 0);
      return recalc(items);
    }
    case 'REMOVE': {
      const items = state.items.filter(i => i.name !== action.name);
      return recalc(items);
    }
    default:
      return state;
  }
}

function recalc(items) {
  return {
    items,
    total: items.reduce((s, i) => s + i.price * i.qty, 0),
    count: items.reduce((s, i) => s + i.qty, 0),
  };
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0, count: 0 });

  const addToCart = (name, price, emoji) => dispatch({ type: 'ADD', payload: { name, price, emoji } });
  const updateQty = (name, delta) => dispatch({ type: 'UPDATE_QTY', name, delta });
  const removeFromCart = (name) => dispatch({ type: 'REMOVE', name });

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
