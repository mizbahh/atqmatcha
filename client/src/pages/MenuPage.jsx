/*
  AI generated frontend for testing functionality. Not intended for production use.
*/

import { useState } from "react";
import Footer from "../components/Footer";
import menuData from "../data/menuData";
import "./MenuPage.css";

const categories = [
  { id: "hot",  label: "☕ Hot Drinks" },
  { id: "iced", label: "🧊 Iced Drinks" },
  { id: "food", label: "🍡 Food & Snacks" },
];

export default function MenuPage({ onTabChange }) {
  const [category, setCategory] = useState("hot");
  const [cart, setCart] = useState([]);
  const [added, setAdded] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  const currentItems = menuData[category];

  const handleOptionChange = (itemName, value) => {
    setSelectedOptions((prev) => ({ ...prev, [itemName]: value }));
  };

  const addToCart = (item) => {
    const option = selectedOptions[item.name] || item.options[0];
    setCart((prev) => {
      const key = `${item.name}__${option}`;
      const existing = prev.find((c) => c.key === key);
      if (existing) return prev.map((c) => c.key === key ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { key, name: item.name, option, price: item.price, qty: 1 }];
    });
    setAdded(item.name);
    setTimeout(() => setAdded(null), 1200);
  };

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((c) => c.key !== key));
  };

  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = cart.reduce((s, c) => s + c.qty * parseFloat(c.price.replace("$", "")), 0);

  return (
    <div className="menu-page">
      {/* Page Header */}
      <div className="menu-header">
        <div className="menu-header-bg">
          <div className="orb orb1" style={{ opacity: 0.2 }} />
          <div className="orb orb2" style={{ opacity: 0.15 }} />
          <div className="grain" />
        </div>
        <div className="menu-header-content">
          <p className="hero-eyebrow">✦ Seasonal Menu ✦ Made to Order</p>
          <h1 className="menu-page-title">
            Menu &<br /><span className="accent">Preorder</span>
          </h1>
          <p className="menu-page-sub">
            Order ahead for pickup at our next pop-up — skip the line, sip faster.
          </p>
        </div>
      </div>

      <div className="menu-body">
        {/* Category Switcher */}
        <div className="category-tabs">
          {categories.map((c) => (
            <button
              key={c.id}
              className={`cat-tab ${category === c.id ? "active" : ""}`}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="menu-layout">
          {/* Items Grid */}
          <div className="menu-items">
            {currentItems.map((item) => (
              <div className="menu-item-card" key={item.name}>
                <div className="mic-swatch" style={{ background: item.color }} />
                <div className="mic-body">
                  <div className="mic-top">
                    <div>
                      <span className="drink-tag">{item.tag}</span>
                      <h3 className="mic-name">{item.name}</h3>
                      <p className="mic-desc">{item.desc}</p>
                    </div>
                    <span className="mic-price">{item.price}</span>
                  </div>

                  {item.options.length > 1 && (
                    <div className="mic-options">
                      <label className="opt-label">Option:</label>
                      <div className="opt-pills">
                        {item.options.map((o) => (
                          <button
                            key={o}
                            className={`opt-pill ${(selectedOptions[item.name] || item.options[0]) === o ? "selected" : ""}`}
                            onClick={() => handleOptionChange(item.name, o)}
                          >
                            {o}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    className={`mic-add ${added === item.name ? "added" : ""}`}
                    onClick={() => addToCart(item)}
                  >
                    {added === item.name ? "✓ Added!" : "+ Add to Order"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Sidebar */}
          <aside className="cart-sidebar">
            <div className="cart-sticky">
              <div className="cart-header">
                <h3>Your Order</h3>
                {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
              </div>

              {cart.length === 0 ? (
                <div className="cart-empty">
                  <span>🍵</span>
                  <p>Your order is empty.<br />Add items from the menu!</p>
                </div>
              ) : (
                <>
                  <ul className="cart-items">
                    {cart.map((c) => (
                      <li key={c.key} className="cart-item">
                        <div className="ci-info">
                          <span className="ci-name">{c.name}</span>
                          <span className="ci-opt">{c.option}</span>
                        </div>
                        <div className="ci-right">
                          <span className="ci-qty">×{c.qty}</span>
                          <span className="ci-price">{c.price}</span>
                          <button className="ci-remove" onClick={() => removeFromCart(c.key)}>✕</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="cart-total">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <button className="btn-primary cart-submit">Place Preorder</button>
                  <p className="cart-note">Pickup at next pop-up · Payment at pickup</p>
                </>
              )}

              <div className="cart-next-popup">
                <p className="cnp-label">📍 Next Pickup</p>
                <p className="cnp-event">Oviedo Farmers Market</p>
                <p className="cnp-date">Sat, April 5 · 8am–1pm</p>
                <button
                  className="btn-ghost light cnp-btn"
                  onClick={() => onTabChange("schedule")}
                >
                  See Full Schedule →
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
