import "./Header.css";
import { LOGO_BANNER_SRC } from "../brand.js";

const baseTabs = [
  { id: "home", label: "Home" },
  { id: "images", label: "Images" },
  { id: "reviews", label: "Reviews" },
  { id: "schedule", label: "Schedule" },
  { id: "inquiry", label: "Event Inquiry" },
  { id: "menu", label: "Menu / Preorder" },
  { id: "blog", label: "Blog & Announcements" },
];

export default function Navbar({ activeTab, onTabChange, scrolled, menuOpen, setMenuOpen, adminMode = false }) {
  const tabs = adminMode
    ? [...baseTabs, { id: "admin", label: "Admin View" }]
    : baseTabs;
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
