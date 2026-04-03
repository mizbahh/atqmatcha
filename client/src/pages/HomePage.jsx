/*
  AI generated frontend for testing functionality. Not intended for production use.
*/

/*
  TODO: EDIT PAGE TO DESIGN LIKING
*/

import Footer from "../components/Footer";
import "./HomePage.css";

export default function HomePage({ onTabChange }) {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="orb orb1" />
          <div className="orb orb2" />
          <div className="orb orb3" />
          <div className="grain" />
        </div>
        <div className="hero-content">
          <p className="hero-eyebrow">✦ Ceremonial Grade ✦ Small Batch ✦ Pop-Up</p>
          <h1 className="hero-title">
            <span className="title-line">Sip the</span>
            <span className="title-line accent">Ceremony</span>
          </h1>
          <p className="hero-sub">
            Hand-whisked matcha drinks crafted with intention — wherever we pop up next.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => onTabChange("schedule")}>Find Us This Weekend</button>
            <button className="btn-ghost" onClick={() => onTabChange("menu")}>Preorder Now</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="bowl-wrap">
            <div className="bowl">
              <div className="matcha-surface">
                <div className="foam f1" />
                <div className="foam f2" />
                <div className="foam f3" />
              </div>
            </div>
            <div className="bowl-shadow" />
          </div>
          <div className="float-tag tag1">Ceremonial Grade 🍃</div>
          <div className="float-tag tag2">Oat Milk Available 🌾</div>
          <div className="float-tag tag3">Cold Brew ✦ Hot ✦ Iced</div>
        </div>
      </section>

      {/* About Strip */}
      <section className="about-strip">
        <div className="strip-inner">
          <div className="strip-text">
            <h2>We travel.<br />You sip.</h2>
            <p>
              We're a roaming matcha bar bringing Japanese tea culture to markets, events, and
              hidden corners of the city. Every cup is made to order — no shortcuts, no syrups, just
              pure ceremonial-grade matcha and good vibes.
            </p>
            <p>Follow our schedule to find where we'll be next, or book us for your event.</p>
          </div>
          <div className="strip-cards">
            <div className="s-card">
              <span className="s-icon">🌿</span>
              <h3>Pure Matcha</h3>
              <p>Ceremonial grade, stone-ground, sourced from Uji, Japan.</p>
            </div>
            <div className="s-card" style={{ cursor: "pointer" }} onClick={() => onTabChange("schedule")}>
              <span className="s-icon">📍</span>
              <h3>Pop-Up Schedule</h3>
              <p>New locations every week — markets, festivals & private events.</p>
            </div>
            <div className="s-card" style={{ cursor: "pointer" }} onClick={() => onTabChange("menu")}>
              <span className="s-icon">🛒</span>
              <h3>Preorder</h3>
              <p>Skip the line. Order ahead and pick up at your preferred pop-up.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Drinks Preview */}
      <section className="menu-preview">
        <div className="mp-inner">
          <div className="section-label">✦ Our Signatures</div>
          <h2 className="section-title">Drinks Worth<br />Traveling For</h2>
          <div className="drinks-grid">
            {[
              { name: "Classic Usucha",     desc: "Traditional thin matcha, hot or iced, with oat or whole milk.", tag: "Bestseller",   color: "#c8e6c2" },
              { name: "Honey Matcha Latte", desc: "Ceremonial matcha, local wildflower honey, steamed oat milk.",  tag: "Fan Favorite", color: "#f5e6b2" },
              { name: "Matcha Tonic",       desc: "Cold brew matcha over sparkling yuzu tonic. Refreshing.",       tag: "Seasonal",     color: "#b2e0e8" },
              { name: "Hojicha Float",      desc: "Roasted hojicha latte topped with ceremonial matcha soft serve.", tag: "Signature",  color: "#e8d5b2" },
            ].map((d) => (
              <div className="drink-card" key={d.name} style={{ "--accent": d.color }}>
                <div className="drink-swatch" style={{ background: d.color }} />
                <div className="drink-info">
                  <span className="drink-tag">{d.tag}</span>
                  <h3>{d.name}</h3>
                  <p>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-primary center-btn" onClick={() => onTabChange("menu")}>
            View Full Menu
          </button>
        </div>
      </section>

      {/* Testimonial */}
      <section className="testimonial">
        <div className="t-inner">
          <div className="t-quote">"</div>
          <blockquote>
            Best matcha I've had outside of Kyoto. The honey latte alone is worth hunting them down.
          </blockquote>
          <cite>— Jamie L., loyal customer since the first pop-up</cite>
        </div>
      </section>


      {/* Next Pop-Up Banner */}
      <section className="next-popup">
        <div className="np-inner">
          <div className="np-left">
            <p className="np-label">Next Pop-Up</p>
            <h2>Oviedo Farmers Market</h2>
            <p className="np-date">📅 Saturday, April 5 · 8am – 1pm</p>
            <p className="np-addr">📍 326 W Broadway St, Oviedo, FL</p>
          </div>
          <div className="np-right">
            <button className="btn-primary" onClick={() => onTabChange("schedule")}>Add to Calendar</button>
            <button className="btn-ghost light" onClick={() => onTabChange("menu")}>Preorder for Pickup</button>
          </div>
        </div>
      </section>
      

      <Footer />
    </div>
  );
}
