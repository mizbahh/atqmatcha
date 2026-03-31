/*
  AI generated frontend for testing functionality. Not intended for production use.
*/

import { useState, useEffect } from "react";
import "./App.css";

import Navbar      from "./components/Header.jsx";
import ComingSoon  from "./components/ComingSoon.jsx";
import HomePage    from "./pages/HomePage.jsx";
import ImagesPage  from "./pages/ImagesPage.jsx";
import MenuPage    from "./pages/MenuPage.jsx";
import tabs        from "./data/tabs.js";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  const handleTabChange = (id) => {
    setActiveTab(id);
    setMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home": return <HomePage onTabChange={handleTabChange} />;
      case "images": return <ImagesPage onTabChange={handleTabChange} />;
      case "menu": return <MenuPage onTabChange={handleTabChange} />;
      default: {
        const t = tabs.find((t) => t.id === activeTab);
        return <ComingSoon title={t?.label} />;
      }
    }
  };

  return (
    <div className="app">
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}
