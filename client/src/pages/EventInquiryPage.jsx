/*
  AI generated frontend for testing functionality. Not intended for production use.
*/

/*
  TODO: LIKELY NUKE PAGE; IF NOT IMPLEMENT BACKEND AND EDIT FRONTEND
*/

import { useState } from "react";
import Footer from "../components/Footer";
import "./EventInquiryPage.css";

const eventTypes = ["Private Party", "Corporate Event", "Wedding", "Farmers Market", "Festival / Fair", "Pop-Up Shop", "Other"];
const guestRanges = ["Under 25", "25 – 50", "51 – 100", "101 – 250", "250+"];

const faqs = [
  { q: "How far in advance should I book?",           a: "We recommend reaching out at least 4–6 weeks in advance for private events, and 2–3 months for large festivals or weddings. We book up quickly on weekends!" },
  { q: "Do you require a deposit?",                   a: "Yes — a 25% deposit is required to secure your date. The remaining balance is due 48 hours before the event." },
  { q: "What do you bring to the event?",             a: "We bring our full setup: portable brew station, all equipment, ingredients, signage, and two trained baristas. You just provide the space!" },
  { q: "Can we customize the menu?",                  a: "Absolutely. We can create a custom menu around your theme — seasonal flavors, branded cups, custom names for drinks, and more." },
  { q: "What's your travel radius?",                  a: "We primarily serve Central Florida (Orlando metro, Oviedo, Winter Park, Sanford, Lake Mary). Contact us for events outside this area." },
];

export default function EventInquiryPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", eventType: "", guestCount: "",
    date: "", location: "", notes: "", howHeard: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.eventType || !form.date) {
      setError("Please fill in your name, email, event type, and preferred date.");
      return;
    }
    console.log("Event inquiry submitted:", form);
    setSubmitted(true);
    setError("");
  };

  if (submitted) {
    return (
      <div className="inquiry-page">
        <div className="page-header green-header">
          <div className="ph-bg"><div className="orb orb1"/><div className="orb orb2"/><div className="grain"/></div>
          <div className="ph-content">
            <h1 className="ph-title">Thank You!</h1>
            <p className="ph-sub">We've received your inquiry and will be in touch within 1–2 business days.</p>
          </div>
        </div>
        <div className="submit-success">
          <span>🍵</span>
          <h2>Your inquiry is steeping…</h2>
          <p>We'll reach out to <strong>{form.email}</strong> shortly to discuss your event.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="inquiry-page">
      <div className="page-header green-header">
        <div className="ph-bg"><div className="orb orb1"/><div className="orb orb2"/><div className="grain"/></div>
        <div className="ph-content">
          <p className="hero-eyebrow">✦ Bring Us To You</p>
          <h1 className="ph-title">Event<br /><span style={{fontStyle:"italic", color:"var(--green-pale)"}}>Inquiry</span></h1>
          <p className="ph-sub">From intimate gatherings to large festivals — let's make your event unforgettable.</p>
        </div>
      </div>

      {/* Why book us */}
      <div className="why-strip">
        <div className="why-inner">
          {[
            { icon: "🌿", title: "Full Setup Included",    desc: "Portable brew station, equipment, signage — we handle everything." },
            { icon: "✦",  title: "Custom Menus",           desc: "Tailored drink menus to match your event theme and brand." },
            { icon: "👩‍🍳", title: "Trained Baristas",      desc: "Our team brings expertise and warmth to every event." },
            { icon: "📍", title: "Central Florida",        desc: "Serving Orlando metro and surrounding areas. Ask about travel." },
          ].map((w) => (
            <div className="why-card" key={w.title}>
              <span className="why-icon">{w.icon}</span>
              <h4>{w.title}</h4>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="inquiry-body">
        <div className="inquiry-layout">
          {/* Form */}
          <div className="inquiry-form">
            <h2>Tell Us About Your Event</h2>
            <p className="form-intro">Fill out the form below and we'll get back to you within 1–2 business days.</p>

            <div className="if-section-label">Contact Info</div>
            <div className="if-row">
              <div className="if-field">
                <label>Full Name *</label>
                <input type="text" placeholder="Your name" value={form.name} onChange={set("name")} />
              </div>
              <div className="if-field">
                <label>Email *</label>
                <input type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} />
              </div>
            </div>
            <div className="if-field">
              <label>Phone (optional)</label>
              <input type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={set("phone")} />
            </div>

            <div className="if-section-label">Event Details</div>
            <div className="if-row">
              <div className="if-field">
                <label>Event Type *</label>
                <select value={form.eventType} onChange={set("eventType")}>
                  <option value="">Select type…</option>
                  {eventTypes.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="if-field">
                <label>Expected Guests</label>
                <select value={form.guestCount} onChange={set("guestCount")}>
                  <option value="">Select range…</option>
                  {guestRanges.map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
            </div>
            <div className="if-row">
              <div className="if-field">
                <label>Preferred Date *</label>
                <input type="date" value={form.date} onChange={set("date")} />
              </div>
              <div className="if-field">
                <label>Event Location / Venue</label>
                <input type="text" placeholder="City, venue, or address" value={form.location} onChange={set("location")} />
              </div>
            </div>
            <div className="if-field">
              <label>Additional Notes</label>
              <textarea rows={4} placeholder="Tell us more — theme, special requests, accessibility needs…" value={form.notes} onChange={set("notes")} />
            </div>
            <div className="if-field">
              <label>How did you hear about us?</label>
              <input type="text" placeholder="Instagram, friend, farmers market…" value={form.howHeard} onChange={set("howHeard")} />
            </div>

            {error && <p className="if-error">{error}</p>}
            <button className="btn-primary" onClick={handleSubmit}>Send Inquiry →</button>
          </div>

          {/* FAQ Sidebar */}
          <aside className="faq-sidebar">
            <h3>Common Questions</h3>
            {faqs.map((faq, i) => (
              <div className="faq-item" key={i}>
                <button className={`faq-q ${openFaq === i ? "open" : ""}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="faq-chevron">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <p className="faq-a">{faq.a}</p>}
              </div>
            ))}
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
