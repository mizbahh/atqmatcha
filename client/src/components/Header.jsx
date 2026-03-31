/*
  AI generated frontend for testing functionality. Not intended for production use.
*/

import "./Header.css";
import tabs from "../data/tabs";

export default function Navbar({ activeTab, onTabChange, scrolled, menuOpen, setMenuOpen }) {
  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""} ${activeTab !== "home" ? "navbar-light" : ""}`}>
      <div className="nav-inner">
        <div className="nav-brand" onClick={() => onTabChange("home")}>
          <span className="nav-name">ATQ Matcha Pop-Up</span>
        </div>
        <nav className={`nav-tabs ${menuOpen ? "open" : ""}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => { onTabChange(tab.id); setMenuOpen(false); }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
