/*
  Main component that manages the active tabs of the app, rendering the appropriate tab.
*/

/*
  AI template generated -- modified from there
*/

import { useState, useEffect } from "react";
import "./App.css";

import Navbar      from "./components/Header.jsx";
import HomePage    from "./pages/HomePage.jsx";
import ImagesPage  from "./pages/ImagesPage.jsx";
import ReviewsPage from "./pages/ReviewsPage.jsx";
import SchedulePage from "./pages/SchedulePage.jsx";
import EventInquiryPage from "./pages/EventInquiryPage.jsx";
import MenuPage    from "./pages/MenuPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import tabs        from "./data/tabs.js";

export default function App() {
  // Sets the active tab to home by default, and tracks scroll and menu state for the navbar
  const [activeTab, setActiveTab] = useState("home");
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  // Adds a scroll listener to update the scrolled state for the navbar, and scrolls to top on tab change
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrolls to top smoothly whenever the active tab changes (as long as it is in a specific threshold)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  // Handles tab changes
  const handleTabChange = (id) => {
    setActiveTab(id);
    setMenuOpen(false);
  };

  // Renders content of active tab within the 'main-content' class
  const renderContent = () => {
    switch (activeTab) {
      case "home":     return <HomePage    onTabChange={handleTabChange} />;
      case "menu":     return <MenuPage     onTabChange={handleTabChange} />;
      case "images":   return <ImagesPage />;
      case "reviews":  return <ReviewsPage onTabChange={handleTabChange}/>;
      case "schedule": return <SchedulePage  onTabChange={handleTabChange} />;
      case "inquiry":  return <EventInquiryPage />;
      case "blog":     return <BlogPage />;
      default: {
        const t = tabs.find((t) => t.id === activeTab);
      }
    }
  };

  return (
    <div className="app">
      {/* Renders navbar once at the top, never re-renders */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Renders the content of the active tab within the main content area */}
      <main className="main-content">
        {renderContent()}
      </main>

    </div>
  );
}
