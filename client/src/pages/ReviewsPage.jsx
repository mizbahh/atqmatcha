/*
  AI generated frontend for testing functionality. Not intended for production use.
*/

/*
  TODO: PROPERLY IMPLEMENT BACKEND FOR LOADING REVIEWS AND ADDING REVIEWS
*/

import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import "./ReviewsPage.css";

function formatMonthYear(dateValue) {
  if (!dateValue) return "Recent";
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return "Recent";

  return parsed.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
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
        >
          ★
        </span>
      ))}
    </div>
  );
}

function RatingSummary({ reviews }) {
  if (!reviews.length) {
    return (
      <div className="rating-summary">
        <div className="rs-big">
          <span className="rs-number">0.0</span>
          <Stars count={0} />
          <span className="rs-total">0 reviews</span>
        </div>
        <div className="rs-bars">
          {[5, 4, 3, 2, 1].map((n) => (
            <div className="rs-bar-row" key={n}>
              <span className="rs-bar-label">{n}★</span>
              <div className="rs-bar-track">
                <div className="rs-bar-fill" style={{ width: "0%" }} />
              </div>
              <span className="rs-bar-count">0</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const avg = (reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length).toFixed(1);

  const counts = [5, 4, 3, 2, 1].map((n) => {
    const count = reviews.filter((review) => review.stars === n).length;
    return {
      n,
      count,
      pct: Math.round((count / reviews.length) * 100),
    };
  });

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
  const [reviews, setReviews] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    tag: "",
    stars: 0,
    text: "",
    displayDate: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:5001/api/reviews");
        const data = await response.json();

        if (!response.ok) {
          console.error(data.message || "Failed to load reviews");
          return;
        }

        const dbReviews = data.map((review, index) => ({
          id: review._id || `db-${index}`,
          name: review.name || "Recent Guest",
          date: review.displayDate || formatMonthYear(review.createdOn),
          stars: review.rating || 0,
          tag: review.title || "",
          text: review.content || "",
        }));

        setReviews(dbReviews);
      } catch (err) {
        console.error("Error loading reviews:", err);
      } finally {
        setLoading(false);
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
          name: newReview.name,
          title: newReview.tag || "Review",
          content: newReview.text,
          rating: newReview.stars,
          displayDate: newReview.displayDate
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || data.msg || "Failed to submit review.");
        return;
      }

      const now =
        data.displayDate ||
        (data.createdOn
          ? new Date(data.createdOn).toLocaleString("en-US", { month: "long", year: "numeric" })
          : new Date().toLocaleString("en-US", { month: "long", year: "numeric" }));

      setReviews((currentReviews) => [
        {
          id: data._id || Date.now(),
          name: data.name || newReview.name,
          date: now,
          stars: data.rating ?? newReview.stars,
          tag: data.title || newReview.tag,
          text: data.content || newReview.text,
        },
        ...currentReviews,
      ]);

      setNewReview({ name: "", tag: "", stars: 0, text: "", displayDate: "" });
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
      <div className="page-header green-header">
        <div className="ph-bg">
          <div className="orb orb1" />
          <div className="orb orb2" />
          <div className="grain" />
        </div>

        <div className="ph-content">
          <p className="hero-eyebrow">✦ From Our Community</p>
          <h1 className="ph-title">Reviews</h1>
          <p className="ph-sub">Honest words from people who waited in line and came back anyway.</p>
        </div>
      </div>

      <div className="reviews-body">
        <div className="reviews-top">
          <RatingSummary reviews={reviews} />
          <button className="btn-primary" onClick={() => setFormOpen(!formOpen)}>
            {formOpen ? "Cancel" : "✍ Leave a Review"}
          </button>
        </div>

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
                    <input
                      type="text"
                      placeholder="Your name"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    />
                  </div>

                  <div className="rf-field">
                    <label>Favorite Item (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Honey Matcha Latte"
                      value={newReview.tag}
                      onChange={(e) => setNewReview({ ...newReview, tag: e.target.value })}
                    />
                  </div>
                </div>

                <div className="rf-field">
                  <label>Rating *</label>
                  <Stars
                    count={newReview.stars}
                    interactive
                    onSet={(n) => setNewReview({ ...newReview, stars: n })}
                  />
                </div>

                <div className="rf-field">
                  <label>Review *</label>
                  <textarea
                    placeholder="Tell us about your experience…"
                    rows={4}
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  />
                </div>

                {error && <p className="rf-error">{error}</p>}
                <button className="btn-primary" onClick={handleSubmit}>
                  Submit Review
                </button>
              </>
            )}
          </div>
        )}

        <div className="reviews-grid">
          {loading ? (
            <p>Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((review, i) => (
              <div className="review-card" key={review.id} style={{ animationDelay: `${i * 60}ms` }}>
                <div className="rc-top">
                  <div className="rc-avatar">{review.name?.[0] || "R"}</div>
                  <div>
                    <p className="rc-name">{review.name}</p>
                    <p className="rc-date">{review.date}</p>
                  </div>
                  <Stars count={review.stars} />
                </div>

                {review.tag && <span className="rc-tag">{review.tag}</span>}
                <p className="rc-text">"{review.text}"</p>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}