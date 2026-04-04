import Footer from "../components/Footer";
import PageHero from "../components/PageHero.jsx";
import "./HomePage.css";

export default function HomePage({ onTabChange }) {
  return (
    <div className="page home">
      <PageHero
        tone="green"
        label="Orlando matcha pop-up cafe"
        title={<span className="home-wordmark">atq matcha</span>}
        lede="First harvest matcha from Japan, housemade syrups. All drinks freshly hand-whisked to order. Serving pop-ups and private events across Central Florida."
      />

      <div className="page-panel page-panel--dark">
        <div className="page-wide strip-bar">
          <p className="strip-bar__text">
            Pop-ups and private events - preorder for pickup or book us for your gathering.
          </p>
          <div className="strip-bar__actions">
            <button type="button" className="strip-bar__btn" onClick={() => onTabChange("schedule")}>
              Schedule
            </button>
            <button type="button" className="strip-bar__btn" onClick={() => onTabChange("menu")}>
              Menu
            </button>
            <button type="button" className="strip-bar__btn" onClick={() => onTabChange("inquiry")}>
              Events
            </button>
          </div>
        </div>
      </div>

      <div className="page-panel page-panel--white home-highlights-panel">
        <div className="page-inner">
          <h2 className="section-heading">What we do</h2>
          <ul className="home-highlights">
            <li className="home-highlight">
              <span className="home-highlight__title">Pop-ups & private events</span>
              <span className="home-highlight__text">
                We set up at markets and festivals and cater private gatherings.
              </span>
            </li>
            <li className="home-highlight">
              <span className="home-highlight__title">First harvest matcha from Japan</span>
              <span className="home-highlight__text">Sourced with care, whisked to order.</span>
            </li>
            <li className="home-highlight">
              <span className="home-highlight__title">Housemade syrups</span>
              <span className="home-highlight__text">Simple, seasonal, and signature flavors in every cup.</span>
            </li>
            <li className="home-highlight">
              <span className="home-highlight__title">Who we are</span>
              <span className="home-highlight__text">Pakistani and Muslim-owned, with love in every pour.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="page-panel page-panel--purple home-next-panel">
        <div className="page-inner">
          <p className="page-hero__label">Next</p>
          <p className="home-next-detail">
            Oviedo Farmers Market · Saturday, April 5 · 8am–1pm · 326 W Broadway St, Oviedo
          </p>
          <button type="button" className="inline-link" onClick={() => onTabChange("schedule")}>
            Full calendar
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
