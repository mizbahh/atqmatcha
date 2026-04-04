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

const typeColors = {
  Market:  { bg: "#eef6ec", text: "#2d5a27", border: "#c8e6c2" },
  Festival:{ bg: "#fdf6e3", text: "#7a5c00", border: "#f5e6b2" },
  Special: { bg: "#f3eaff", text: "#5a2d82", border: "#d9b8f5" },
};

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function CalendarMonth({ year, month, events, onSelect, selected }) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const eventDates = new Set(events.filter(e => {
    const d = new Date(e.date);
    return d.getUTCFullYear() === year && d.getUTCMonth() === month;
  }).map(e => new Date(e.date).getUTCDate()));

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="calendar">
      <div className="cal-grid">
        {DAYS.map(d => <div key={d} className="cal-day-label">{d}</div>)}
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} className="cal-cell empty" />;
          const dateStr = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
          const hasEvent = eventDates.has(day);
          const isSelected = selected === dateStr;
          const isToday = new Date().toISOString().slice(0,10) === dateStr;
          return (
            <div
              key={day}
              className={`cal-cell ${hasEvent ? "has-event" : ""} ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}`}
              onClick={() => hasEvent && onSelect(dateStr)}
            >
              <span>{day}</span>
              {hasEvent && <div className="cal-dot" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SchedulePage({ onTabChange }) {
  
  const [events, setEvents] = useState([]);

  useEffect( () => {
      async function fetchEvents() {
        try{
          const res = await fetch("http://localhost:5001/api/schedule");
          const data = await res.json();
          setEvents(data);
        } catch(err){
          console.log("Error Fetching Events:", err);
        }
      }
      fetchEvents();
  }, []);

  
  
  const now = new Date();
  const [viewYear,  setViewYear]  = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selected,  setSelected]  = useState(null);

  const prevMonth = () => { if (viewMonth === 0) { setViewYear(y => y-1); setViewMonth(11); } else setViewMonth(m => m-1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewYear(y => y+1); setViewMonth(0); } else setViewMonth(m => m+1); };

  const todayStr = new Date().toISOString().slice(0, 10); //"YYYY-MM-DD"
  const filteredEvents = events.filter(e => e.date >= todayStr);

  const visibleEvents = selected
    ? events.filter(e => e.date >= todayStr && e.date === selected)
    : events.filter(e => 
        e.date >= todayStr &&
        new Date(e.date).getUTCFullYear() === viewYear &&
        new Date(e.date).getUTCMonth() === viewMonth
      );

  const upcomingEvents = filteredEvents.slice(0,3)

  const formatDate = (str) => {
    const d = new Date(str + "T00:00:00");
    return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  };

  return (
    <div className="schedule-page">
      <div className="page-header green-header">
        <div className="ph-bg"><div className="orb orb1" /><div className="orb orb2" /><div className="grain" /></div>
        <div className="ph-content">
          <p className="hero-eyebrow">✦ Find Us Near You</p>
          <h1 className="ph-title">Schedule</h1>
          <p className="ph-sub">We move around — here's where we'll be. Tap a date to see details.</p>
        </div>
      </div>

      {/* Next 3 upcoming */}
      <div className="upcoming-strip">
        <div className="us-inner">
          <p className="us-label">✦ Coming Up</p>
          <div className="upcoming-cards">
            {upcomingEvents.map((ev) => (
              <div className="upcoming-card" key={ev.id} style={{ borderColor: typeColors[ev.type]?.border }}>
                <div className="uc-date-block">
                  <span className="uc-month">{MONTHS[new Date(ev.date+"T00:00:00").getMonth()].slice(0,3).toUpperCase()}</span>
                  <span className="uc-day">{new Date(ev.date+"T00:00:00").getDate()}</span>
                </div>
                <div className="uc-info">
                  <span className="uc-type" style={{ color: typeColors[ev.type]?.text, background: typeColors[ev.type]?.bg }}>{ev.type}</span>
                  <p className="uc-name">{ev.name}</p>
                  <p className="uc-time">🕐 {ev.time} · 📍 {ev.location.split(",")[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar + event list */}
      <div className="schedule-body">
        <div className="schedule-layout">
          <div className="cal-section">
            <div className="cal-nav">
              <button className="cal-nav-btn" onClick={prevMonth}>‹</button>
              <h2>{MONTHS[viewMonth]} {viewYear}</h2>
              <button className="cal-nav-btn" onClick={nextMonth}>›</button>
            </div>
            <CalendarMonth year={viewYear} month={viewMonth} events={filteredEvents} onSelect={setSelected} selected={selected} />
            {selected && (
              <button className="clear-sel" onClick={() => setSelected(null)}>Show all this month ×</button>
            )}
          </div>

          <div className="event-list">
            <h3 className="el-heading">
              {selected ? formatDate(selected) : `${MONTHS[viewMonth]} Events`}
            </h3>
            {visibleEvents.length === 0 ? (
              <div className="el-empty">
                <span>📅</span>
                <p>No events this {selected ? "day" : "month"}.<br />Check another month or <button className="inline-link" onClick={() => onTabChange("inquiry")}>book us for your event</button>!</p>
              </div>
            ) : (
              visibleEvents.map((ev) => (
                <div className="event-card" key={ev.id}>
                  <div className="ec-left" style={{ background: typeColors[ev.type]?.bg, borderColor: typeColors[ev.type]?.border }}>
                    <span className="ec-month">{MONTHS[new Date(ev.date+"T00:00:00").getMonth()].slice(0,3)}</span>
                    <span className="ec-day">{new Date(ev.date+"T00:00:00").getDate()}</span>
                  </div>
                  <div className="ec-info">
                    <span className="ec-type" style={{ color: typeColors[ev.type]?.text }}>{ev.type}</span>
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
      </div>
      <Footer />
    </div>
  );
}
