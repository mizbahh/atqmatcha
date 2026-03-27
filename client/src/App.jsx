/* 
THIS IS A PLACEHOLDER AI GENERATED FRONTEND FOR THE PURPOSE OF TESTING FUNCTIONALITY.
*/

import { useState, useEffect } from "react";
import "./App.css";


const tabs = [
  { id: "home", label: "Home" },
  { id: "images", label: "Images" },
  { id: "reviews", label: "Reviews" },
  { id: "schedule", label: "Schedule" },
  { id: "inquiry", label: "Event Inquiry" },
  { id: "menu", label: "Menu / Preorder" },
  { id: "blog", label: "Blog & Announcements" },
];

function ComingSoon({ title }) {
  return (
    <div className="coming-soon">
      <div className="cs-inner">
        <span className="cs-leaf">🍵</span>
        <h2>{title}</h2>
        <p>This page is steeping… check back soon.</p>
      </div>
    </div>
  );
}

// Homepage rendering
export function HomePage() {
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
            <button className="btn-primary">Find Us This Weekend</button>
            <button className="btn-ghost">Preorder Now</button>
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

    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderContent = () => {
    if (activeTab === "home") return <HomePage />;
    const t = tabs.find((t) => t.id === activeTab);
    return <ComingSoon title={t?.label} />;
  };

  return (
    <div className="app">
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-brand" onClick={() => setActiveTab("home")}>
            {/* <span className="nav-kanji">抹茶</span> */}
            <span className="nav-name">atq matcha</span>
          </div>
          <nav className={`nav-tabs ${menuOpen ? "open" : ""}`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`nav-tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => { setActiveTab(tab.id); setMenuOpen(false); }}
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

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}
