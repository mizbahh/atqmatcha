import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero.jsx";
import "./SchedulePage.css";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function SchedulePage({ onTabChange }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("http://localhost:5001/api/schedule");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.log("Error Fetching Events:", err);
      }
    }
    fetchEvents();
  }, []);

  const todayStr = new Date().toISOString().slice(0, 10);
  const visibleEvents = events.filter((e) => e.date >= todayStr);

  return (
    <div className="page schedule-page">
      <PageHero
        tone="green"
        label="Pop-ups"
        title="Schedule"
        lede="Where we are next — markets, festivals, and private events."
      />

      <div className="page-panel page-panel--white schedule-body">
        <div className="page-inner">
          <h2 className="section-heading">Upcoming</h2>
          {visibleEvents.length === 0 ? (
            <div className="schedule-empty">
              <p className="muted">No upcoming dates listed yet.</p>
              <p>
                <button type="button" className="inline-link" onClick={() => onTabChange("inquiry")}>
                  Book us for your event
                </button>
              </p>
            </div>
          ) : (
            <ul className="event-list">
              {visibleEvents.map((ev) => (
                <li className="event-card" key={ev.id}>
                  <div className="event-card__date" aria-hidden>
                    <span className="event-card__month">
                      {MONTHS[new Date(`${ev.date}T00:00:00`).getMonth()].slice(0, 3)}
                    </span>
                    <span className="event-card__day">
                      {new Date(`${ev.date}T00:00:00`).getDate()}
                    </span>
                  </div>
                  <div className="event-card__body">
                    <span className="event-card__type">{ev.type}</span>
                    <h3 className="event-card__name">{ev.name}</h3>
                    <p className="event-card__meta">{ev.time}</p>
                    <p className="event-card__meta">{ev.location}</p>
                    {ev.note ? <p className="event-card__note">{ev.note}</p> : null}
                  </div>
                  <button
                    type="button"
                    className="btn-ghost event-card__btn"
                    onClick={() => onTabChange("menu")}
                  >
                    Preorder
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="page-panel page-panel--purple schedule-foot">
        <div className="page-inner">
          <p className="schedule-foot__text">
            Need us at your venue?{" "}
            <button type="button" className="inline-link" onClick={() => onTabChange("inquiry")}>
              Send an inquiry
            </button>
            .
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
