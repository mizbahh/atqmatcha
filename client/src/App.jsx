/*
  Main component that manages the active tabs of the app, rendering the appropriate tab.
*/

import { useMemo, useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Header.jsx";
import { isAdmin } from "./auth";
import HomePage from "./pages/HomePage.jsx";
import ImagesPage from "./pages/ImagesPage.jsx";
import ReviewsPage from "./pages/ReviewsPage.jsx";
import SchedulePage from "./pages/SchedulePage.jsx";
import EventInquiryPage from "./pages/EventInquiryPage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import AdminViewPage from "./pages/AdminViewPage.jsx";
import AdminOrdersPage from "./pages/AdminOrdersPage.jsx";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const adminMode = useMemo(() => isAdmin(), []);

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
      case "home":
        return <HomePage onTabChange={handleTabChange} />;
      case "menu":
        return <MenuPage onTabChange={handleTabChange} />;
      case "images":
        return <ImagesPage />;
      case "reviews":
        return <ReviewsPage />;
      case "schedule":
        return <SchedulePage onTabChange={handleTabChange} />;
      case "inquiry":
        return <EventInquiryPage />;
      case "blog":
        return <BlogPage />;
      case "admin":
        return adminMode ? <AdminViewPage onTabChange={handleTabChange} /> : <HomePage onTabChange={handleTabChange} />;
      case "adminOrders":
        return adminMode ? <AdminOrdersPage onTabChange={handleTabChange} /> : <HomePage onTabChange={handleTabChange} />;
      default:
        return <HomePage onTabChange={handleTabChange} />;
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
        adminMode={adminMode}
      />

      <main className="main-content">{renderContent()}</main>
    </div>
  );
}
