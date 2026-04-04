import { useState } from "react";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero.jsx";
import menuData from "../data/menuData";
import "./MenuPage.css";

const categories = [{ id: "hot", label: "Matcha lattes" }];

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
      if (existing) {
        return prev.map((c) => (c.key === key ? { ...c, qty: c.qty + 1 } : c));
      }
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
    <div className="page menu-page">
      <PageHero
        tone="purple"
        label="Order ahead"
        title="Menu"
        lede="All drinks freshly hand-whisked to order. Preorder for pickup at our next pop-up."
      />

      <div className="page-panel page-panel--dark">
        <div className="page-wide strip-bar">
          <p className="strip-bar__text">
            Next pickup · Oviedo Farmers Market · Sat, April 5 · 8am–1pm
          </p>
          <div className="strip-bar__actions">
            <button type="button" className="strip-bar__btn" onClick={() => onTabChange("schedule")}>
              Full schedule
            </button>
          </div>
        </div>
      </div>

      <div className="page-panel page-panel--white menu-body">
        <div className="page-wide menu-layout">
          <div className="menu-main">
            {categories.length > 1 ? (
              <div className="category-tabs">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`cat-tab ${category === c.id ? "active" : ""}`}
                    onClick={() => setCategory(c.id)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            ) : null}

            <ul className="menu-items">
              {currentItems.map((item) => (
                <li className="menu-item-card" key={item.name}>
                  <div className="menu-item-card__accent" style={{ background: item.color }} aria-hidden />
                  <div className="menu-item-card__body">
                    <div className="menu-item-card__top">
                      <div>
                        {item.tag ? <span className="menu-item-card__tag">{item.tag}</span> : null}
                        <h3 className="menu-item-card__name">{item.name}</h3>
                        <p className="menu-item-card__desc">{item.desc}</p>
                      </div>
                      <span className="menu-item-card__price">{item.price}</span>
                    </div>

                    {item.options.length > 1 ? (
                      <div className="menu-item-card__options">
                        <span className="menu-item-card__opt-label">Option</span>
                        <div className="opt-row">
                          {item.options.map((o) => (
                            <button
                              key={o}
                              type="button"
                              className={`opt-chip ${
                                (selectedOptions[item.name] || item.options[0]) === o ? "selected" : ""
                              }`}
                              onClick={() => handleOptionChange(item.name, o)}
                            >
                              {o}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <button
                      type="button"
                      className={`btn-primary menu-add ${added === item.name ? "is-added" : ""}`}
                      onClick={() => addToCart(item)}
                    >
                      {added === item.name ? "Added" : "Add"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="cart-sidebar">
            <div className="cart-box">
              <div className="cart-box__head">
                <h2 className="section-heading cart-box__title">Order</h2>
                {totalItems > 0 ? <span className="cart-box__count">{totalItems}</span> : null}
              </div>

              {cart.length === 0 ? (
                <p className="cart-box__empty muted">Nothing added yet.</p>
              ) : (
                <>
                  <ul className="cart-list">
                    {cart.map((c) => (
                      <li className="cart-line" key={c.key}>
                        <div>
                          <span className="cart-line__name">{c.name}</span>
                          <span className="cart-line__opt">{c.option}</span>
                        </div>
                        <div className="cart-line__right">
                          <span>×{c.qty}</span>
                          <span>{c.price}</span>
                          <button type="button" className="cart-line__remove" onClick={() => removeFromCart(c.key)}>
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="cart-total">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <button type="button" className="btn-primary cart-submit">
                    Place preorder
                  </button>
                  <p className="cart-note muted">
                    All drinks freshly hand-whisked to order. Pickup at next pop-up · Pay on pickup
                  </p>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
