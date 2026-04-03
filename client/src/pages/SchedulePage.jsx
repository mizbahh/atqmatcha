/*
  AI generated frontend for testing functionality. Not intended for production use.
*/

/*
  TODO: ADD BACKEND FUNCTIONALITY FOR CALENDAR EVENTS, MAYBE ADD ADMIN FUNCTIONALITY TO BE ABLE TO ADD AND DELETE EVENTS
  ALSO PROBABLY CHECK AGAINST USER TIME/DATE AND SEE IF EVENT HAS ALREADY PASSED, AND NOT RENDER IF SO
*/

import Footer from "../components/Footer";
import "./SchedulePage.css";

const events = [
  { id: 1,  date: "2026-04-05", name: "Oviedo Farmers Market",       time: "8am – 1pm",  location: "326 W Broadway St, Oviedo, FL",         type: "Market",  note: "Find us near the east entrance!" },
  { id: 2,  date: "2026-04-12", name: "Winter Park Harvest Festival", time: "9am – 3pm",  location: "Central Park, Winter Park, FL",          type: "Festival", note: "Our biggest event of the season." },
  { id: 3,  date: "2026-04-13", name: "UCF Sunday Market",           time: "10am – 2pm", location: "UCF Campus, Orlando, FL",                type: "Market",  note: "Student discount available!" },
  { id: 4,  date: "2026-04-19", name: "Oviedo Farmers Market",       time: "8am – 1pm",  location: "326 W Broadway St, Oviedo, FL",         type: "Market",  note: "" },
  { id: 5,  date: "2026-04-25", name: "Earth Day Pop-Up",            time: "11am – 5pm", location: "Mead Botanical Garden, Winter Park, FL", type: "Special", note: "Proceeds benefit local conservation." },
  { id: 6,  date: "2026-04-26", name: "Oviedo Farmers Market",       time: "8am – 1pm",  location: "326 W Broadway St, Oviedo, FL",         type: "Market",  note: "" },
  { id: 7,  date: "2026-05-03", name: "Oviedo Farmers Market",       time: "8am – 1pm",  location: "326 W Broadway St, Oviedo, FL",         type: "Market",  note: "" },
  { id: 8,  date: "2026-05-10", name: "Mother's Day Market",         time: "9am – 2pm",  location: "Thornton Park, Orlando, FL",            type: "Special", note: "Special hojicha rose latte available!" },
  { id: 9,  date: "2026-05-17", name: "Oviedo Farmers Market",       time: "8am – 1pm",  location: "326 W Broadway St, Oviedo, FL",         type: "Market",  note: "" },
  { id: 10, date: "2026-05-24", name: "Memorial Weekend Festival",   time: "10am – 6pm", location: "Lake Eola Park, Orlando, FL",           type: "Festival", note: "Two-day event — we'll be there both days!" },
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const formatDate = (str) => {
  const d = new Date(str + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
};

export default function SchedulePage({ onTabChange }) {
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
          {events.length === 0 ? (
            <div className="el-empty">
              <p>No upcoming events. <button className="inline-link" onClick={() => onTabChange("inquiry")}>Book us for your event!</button></p>
            </div>
          ) : (
            events.map((ev) => (
              <div className="event-card" key={ev.id}>
                <div className="ec-left">
                  <span className="ec-month">{MONTHS[new Date(ev.date + "T00:00:00").getMonth()].slice(0, 3)}</span>
                  <span className="ec-day">{new Date(ev.date + "T00:00:00").getDate()}</span>
                </div>
                <div className="ec-info">
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