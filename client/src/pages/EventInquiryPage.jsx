import { useState } from "react";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero.jsx";
import "./EventInquiryPage.css";

const eventTypes = [
  "Private party",
  "Corporate event",
  "Wedding",
  "Farmers market",
  "Festival / fair",
  "Pop-up shop",
  "Other",
];
const guestRanges = ["Under 25", "25 – 50", "51 – 100", "101 – 250", "250+"];

const faqs = [
  {
    q: "How far in advance should I book?",
    a: "About 4–6 weeks for private events; longer for large festivals or weddings.",
  },
  { q: "Do you require a deposit?", a: "Yes — 25% to hold the date; balance due 48 hours before." },
  {
    q: "What do you bring?",
    a: "Portable bar setup, equipment, ingredients, and signage. You provide the space.",
  },
  { q: "Custom menus?", a: "Yes — we can tailor drinks to your theme or brand." },
  {
    q: "Where do you travel?",
    a: "Primarily Central Florida; ask if you are farther out.",
  },
];

export default function EventInquiryPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    guestCount: "",
    date: "",
    location: "",
    notes: "",
    howHeard: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.eventType || !form.date) {
      setError("Name, email, event type, and date are required.");
      return;
    }
    console.log("Event inquiry submitted:", form);
    setSubmitted(true);
    setError("");
  };

  if (submitted) {
    return (
      <div className="page inquiry-page">
        <PageHero tone="green" title="Thank you" lede="We will reply within 1–2 business days." />
        <div className="page-panel page-panel--white inquiry-success">
          <div className="page-inner">
            <p className="inquiry-success__text">
              We will reach out at <strong>{form.email}</strong> about your event.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page inquiry-page">
      <PageHero
        tone="purple"
        label="Events"
        title="Inquiry"
        lede="Private parties, markets, and festivals — tell us what you are planning."
      />

      <div className="page-panel page-panel--dark inquiry-intro">
        <div className="page-inner">
          <p className="inquiry-intro__text">
            Full setup, trained baristas, and menus we can adapt to your crowd.
          </p>
        </div>
      </div>

      <div className="page-panel page-panel--white inquiry-body">
        <div className="page-wide inquiry-layout">
          <div className="inquiry-form">
            <h2 className="section-heading">Your event</h2>
            <p className="inquiry-form__intro muted">We usually respond within two business days.</p>

            <p className="if-section">Contact</p>
            <div className="if-row">
              <div className="if-field">
                <label htmlFor="inq-name">Name</label>
                <input id="inq-name" type="text" value={form.name} onChange={set("name")} autoComplete="name" />
              </div>
              <div className="if-field">
                <label htmlFor="inq-email">Email</label>
                <input
                  id="inq-email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="if-field">
              <label htmlFor="inq-phone">Phone (optional)</label>
              <input id="inq-phone" type="tel" value={form.phone} onChange={set("phone")} />
            </div>

            <p className="if-section">Details</p>
            <div className="if-row">
              <div className="if-field">
                <label htmlFor="inq-type">Event type</label>
                <select id="inq-type" value={form.eventType} onChange={set("eventType")}>
                  <option value="">Select…</option>
                  {eventTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="if-field">
                <label htmlFor="inq-guests">Guests</label>
                <select id="inq-guests" value={form.guestCount} onChange={set("guestCount")}>
                  <option value="">Select…</option>
                  {guestRanges.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="if-row">
              <div className="if-field">
                <label htmlFor="inq-date">Preferred date</label>
                <input id="inq-date" type="date" value={form.date} onChange={set("date")} />
              </div>
              <div className="if-field">
                <label htmlFor="inq-loc">Location / venue</label>
                <input id="inq-loc" type="text" value={form.location} onChange={set("location")} />
              </div>
            </div>
            <div className="if-field">
              <label htmlFor="inq-notes">Notes</label>
              <textarea id="inq-notes" rows={4} value={form.notes} onChange={set("notes")} />
            </div>
            <div className="if-field">
              <label htmlFor="inq-heard">How did you hear about us?</label>
              <input id="inq-heard" type="text" value={form.howHeard} onChange={set("howHeard")} />
            </div>

            {error ? <p className="if-error">{error}</p> : null}
            <button type="button" className="btn-primary" onClick={handleSubmit}>
              Send inquiry
            </button>
          </div>

          <aside className="faq-aside">
            <h2 className="section-heading faq-aside__title">Questions</h2>
            {faqs.map((faq, i) => (
              <div className="faq-item" key={faq.q}>
                <button
                  type="button"
                  className={`faq-q ${openFaq === i ? "is-open" : ""}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                </button>
                {openFaq === i ? <p className="faq-a">{faq.a}</p> : null}
              </div>
            ))}
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
