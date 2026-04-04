/*
  AI generated frontend for testing functionality. Not intended for production use.
*/

/*
  TODO: ADD BACKEND FUNCTIONALITY FOR CALENDAR EVENTS, MAYBE ADD ADMIN FUNCTIONALITY TO BE ABLE TO ADD AND DELETE EVENTS
  ALSO PROBABLY CHECK AGAINST USER TIME/DATE AND SEE IF EVENT HAS ALREADY PASSED, AND NOT RENDER IF SO
*/

import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import "./SchedulePage.css";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function SchedulePage({ onTabChange }) {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("http://localhost:5001/api/schedule");
        const data = await res.json();
        setEvents(data);
      } catch(err) {
        console.log("Error Fetching Events:", err);
      }
    }
    fetchEvents();
  }, []);

  const todayStr = new Date().toISOString().slice(0, 10);
  const visibleEvents = events.filter(e => e.date >= todayStr);

  return (
    <div className="schedule-page">
      <div className="page-header green-header">
        <div className="ph-bg"><div className="orb orb1" /><div className="orb orb2" /><div className="grain" /></div>
        <div className="ph-content">
          <p className="hero-eyebrow">✦ Find Us Near You</p>
          <h1 className="ph-title">Schedule</h1>
          <p className="ph-sub">We move around — here's where we'll be.</p>
        </div>
      </div>

      <div className="schedule-body">
        <div className="event-list">
          <h3 className="el-heading">Upcoming Events</h3>
          {visibleEvents.length === 0 ? (
            <div className="el-empty">
              <span>📅</span>
              <p>No upcoming events.<br />Check back soon or <button className="inline-link" onClick={() => onTabChange("inquiry")}>book us for your event</button>!</p>
            </div>
          ) : (
            visibleEvents.map((ev) => (
              <div className="event-card" key={ev.id}>
                <div className="ec-left">
                  <span className="ec-month">{MONTHS[new Date(ev.date + "T00:00:00").getMonth()].slice(0, 3)}</span>
                  <span className="ec-day">{new Date(ev.date + "T00:00:00").getDate()}</span>
                </div>
                <div className="ec-info">
                  <span className="ec-type">{ev.type}</span>
                  <h4 className="ec-name">{ev.name}</h4>
                  <p className="ec-meta">🕐 {ev.time}</p>
                  <p className="ec-meta">📍 {ev.location}</p>
                  {ev.note && <p className="ec-note">💬 {ev.note}</p>}
                </div>
                <button className="btn-ghost light ec-btn" onClick={() => onTabChange("menu")}>Preorder →</button>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}