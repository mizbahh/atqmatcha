import "./Header.css";
import tabs from "../data/tabs";
import { LOGO_BANNER_SRC } from "../brand.js";

export default function Navbar({ activeTab, onTabChange, scrolled, menuOpen, setMenuOpen }) {
  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""} ${activeTab !== "home" ? "navbar-light" : ""}`}>
      <div className="nav-inner">
        <button
          type="button"
          className="nav-brand"
          onClick={() => onTabChange("home")}
          aria-label="Home"
        >
          <img src={LOGO_BANNER_SRC} alt="" className="nav-logo" />
        </button>
        <nav className={`nav-tabs ${menuOpen ? "open" : ""}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => {
                onTabChange(tab.id);
                setMenuOpen(false);
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <button type="button" className="hamburger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
