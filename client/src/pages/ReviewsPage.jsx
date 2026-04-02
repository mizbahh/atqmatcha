/*
  AI generated frontend for testing functionality. Not intended for production use.
*/

import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import "./ReviewsPage.css";

const initialReviews = [
  { id: 1, name: "Jamie L.",      date: "March 2026", stars: 5, tag: "Honey Matcha Latte",   text: "Best matcha I've had outside of Kyoto. The honey latte alone is worth hunting them down. They were at the Oviedo market and the line moved fast — super friendly too." },
  { id: 2, name: "Sofia R.",      date: "March 2026", stars: 5, tag: "Matcha Tonic",          text: "The yuzu tonic is unlike anything I've had. Refreshing, not too sweet, and you can taste how quality the matcha is. Already planning my next order." },
  { id: 3, name: "Marcus T.",     date: "February 2026", stars: 5, tag: "Classic Usucha",     text: "I'm a matcha purist and this is the real deal. Stone-ground, properly whisked — no syrups, no nonsense. Reminds me of a tea house in Uji." },
  { id: 4, name: "Priya M.",      date: "February 2026", stars: 4, tag: "Brown Sugar Matcha", text: "Absolutely gorgeous layered drink. Could have been slightly less sweet for my taste but the matcha quality shines through. Will be back for the tonic next time!" },
  { id: 5, name: "Daniel K.",     date: "January 2026", stars: 5, tag: "Matcha Mochi",        text: "Came for the drinks, stayed for the mochi. The ceremonial koicha was intense and perfect. These folks clearly care deeply about what they serve." },
  { id: 6, name: "Alyssa W.",     date: "January 2026", stars: 5, tag: "Hojicha Latte",       text: "The hojicha latte on a cold morning was absolutely cozy. Roasty, smooth, not bitter at all. My new winter ritual whenever they pop up nearby." },
];

function formatMonthYear(dateValue) {
  if (!dateValue) return "Recent";
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return "Recent";

  return parsed.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function normalizeText(value) {
  return (value || "").trim().toLowerCase();
}

function Stars({ count, interactive = false, onSet }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="stars" aria-label={`${count} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`star ${n <= (interactive ? hovered || count : count) ? "filled" : ""}`}
          onClick={() => interactive && onSet(n)}
          onMouseEnter={() => interactive && setHovered(n)}
          onMouseLeave={() => interactive && setHovered(0)}
          style={{ cursor: interactive ? "pointer" : "default" }}
        >★</span>
      ))}
    </div>
  );
}

function RatingSummary({ reviews }) {
  const avg = (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1);
  const counts = [5, 4, 3, 2, 1].map((n) => ({
    n,
    count: reviews.filter((r) => r.stars === n).length,
    pct: Math.round((reviews.filter((r) => r.stars === n).length / reviews.length) * 100),
  }));
  return (
    <div className="rating-summary">
      <div className="rs-big">
        <span className="rs-number">{avg}</span>
        <Stars count={Math.round(avg)} />
        <span className="rs-total">{reviews.length} reviews</span>
      </div>
      <div className="rs-bars">
        {counts.map(({ n, count, pct }) => (
          <div className="rs-bar-row" key={n}>
            <span className="rs-bar-label">{n}★</span>
            <div className="rs-bar-track">
              <div className="rs-bar-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="rs-bar-count">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [formOpen, setFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", tag: "", stars: 0, text: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/reviews");
        const data = await response.json();

        if (!response.ok) {
          console.error(data.message || "Failed to load reviews");
          return;
        }

        const dbReviews = data.map((review, index) => ({
          id: review._id || `db-${index}`,
          name: "Recent Guest",
          date: formatMonthYear(review.createdOn),
          stars: review.rating,
          tag: review.title,
          text: review.content,
        }));

        const filteredDbReviews = dbReviews.filter((dbReview) => {
          return !initialReviews.some(
            (starterReview) =>
              normalizeText(starterReview.tag) === normalizeText(dbReview.tag) &&
              normalizeText(starterReview.text) === normalizeText(dbReview.text)
          );
        });

        setReviews([...filteredDbReviews, ...initialReviews]);
      } catch (err) {
        console.error("Error loading reviews:", err);
      }
    };

    loadReviews();
  }, []);

  const handleSubmit = async () => {
    if (!newReview.name || !newReview.text || newReview.stars === 0) {
      setError("Please fill in your name, rating, and review.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5001/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "x-auth-token": token } : {}),
        },
        body: JSON.stringify({
          title: newReview.tag || "Review",
          content: newReview.text,
          rating: newReview.stars,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || data.msg || "Failed to submit review.");
        return;
      }

      const now = data.createdOn
        ? new Date(data.createdOn).toLocaleString("en-US", { month: "long", year: "numeric" })
        : new Date().toLocaleString("en-US", { month: "long", year: "numeric" });

      setReviews([
        {
          id: data._id || Date.now(),
          name: newReview.name,
          date: now,
          stars: data.rating ?? newReview.stars,
          tag: data.title || newReview.tag,
          text: data.content || newReview.text,
        },
        ...reviews,
      ]);

      setNewReview({ name: "", tag: "", stars: 0, text: "" });
      setSubmitted(true);
      setError("");
      setTimeout(() => {
        setSubmitted(false);
        setFormOpen(false);
      }, 2500);
    } catch (err) {
      console.error(err);
      setError("Failed to submit review.");
    }
  };

  return (
    <div className="reviews-page">
      {/* Header */}
      <div className="page-header green-header">
        <div className="ph-bg"><div className="orb orb1" /><div className="orb orb2" /><div className="grain" /></div>
        <div className="ph-content">
          <p className="hero-eyebrow">✦ From Our Community</p>
          <h1 className="ph-title">Reviews</h1>
          <p className="ph-sub">Honest words from people who waited in line and came back anyway.</p>
        </div>
      </div>

      <div className="reviews-body">
        {/* Summary + CTA */}
        <div className="reviews-top">
          <RatingSummary reviews={reviews} />
          <button className="btn-primary" onClick={() => setFormOpen(!formOpen)}>
            {formOpen ? "Cancel" : "✍ Leave a Review"}
          </button>
        </div>

        {/* Leave a review form */}
        {formOpen && (
          <div className="review-form">
            <h3>Your Review</h3>
            {submitted ? (
              <p className="form-success">✓ Thank you! Your review has been added.</p>
            ) : (
              <>
                <div className="rf-row">
                  <div className="rf-field">
                    <label>Name *</label>
                    <input type="text" placeholder="Your name" value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })} />
                  </div>
                  <div className="rf-field">
                    <label>Favorite Item (optional)</label>
                    <input type="text" placeholder="e.g. Honey Matcha Latte" value={newReview.tag}
                      onChange={(e) => setNewReview({ ...newReview, tag: e.target.value })} />
                  </div>
                </div>
                <div className="rf-field">
                  <label>Rating *</label>
                  <Stars count={newReview.stars} interactive onSet={(n) => setNewReview({ ...newReview, stars: n })} />
                </div>
                <div className="rf-field">
                  <label>Review *</label>
                  <textarea placeholder="Tell us about your experience…" rows={4} value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })} />
                </div>
                {error && <p className="rf-error">{error}</p>}
                <button className="btn-primary" onClick={handleSubmit}>Submit Review</button>
              </>
            )}
          </div>
        )}

        {/* Review Cards */}
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div className="review-card" key={r.id} style={{ animationDelay: `${i * 60}ms` }}>
              <div className="rc-top">
                <div className="rc-avatar">{r.name[0]}</div>
                <div>
                  <p className="rc-name">{r.name}</p>
                  <p className="rc-date">{r.date}</p>
                </div>
                <Stars count={r.stars} />
              </div>
              {r.tag && <span className="rc-tag">{r.tag}</span>}
              <p className="rc-text">"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}