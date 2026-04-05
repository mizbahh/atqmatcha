import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero.jsx";
import "./ReviewsPage.css";
import {jwtDecode} from "jwt-decode";

function formatMonthYear(dateValue) {
  if (!dateValue) return "Recent";
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return "Recent";
  return parsed.toLocaleString("en-US", { month: "long", year: "numeric" });
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
        <div className="rating-summary__main">
          <span className="rating-summary__num">0.0</span>
          <Stars count={0} />
          <span className="muted">0 reviews</span>
        </div>
        <div className="rating-summary__bars">
          {[5, 4, 3, 2, 1].map((n) => (
            <div className="rating-bar" key={n}>
              <span>{n}</span>
              <div className="rating-bar__track">
                <div className="rating-bar__fill" style={{ width: "0%" }} />
              </div>
              <span className="rating-bar__n">0</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const avg = (reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length).toFixed(1);
  const counts = [5, 4, 3, 2, 1].map((n) => {
    const count = reviews.filter((review) => review.stars === n).length;
    return { n, count, pct: Math.round((count / reviews.length) * 100) };
  });

  return (
    <div className="rating-summary">
      <div className="rating-summary__main">
        <span className="rating-summary__num">{avg}</span>
        <Stars count={Math.round(Number(avg))} />
        <span className="muted">{reviews.length} reviews</span>
      </div>
      <div className="rating-summary__bars">
        {counts.map(({ n, count, pct }) => (
          <div className="rating-bar" key={n}>
            <span>{n}</span>
            <div className="rating-bar__track">
              <div className="rating-bar__fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="rating-bar__n">{count}</span>
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
    displayDate: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).user.id : null;



  useEffect(() => {


    if (token) {
    const decoded = jwtDecode(token);
    console.log("Decoded JWT:", decoded);
    }


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
          customerId: review.customerId || review.userId,
          name: review.name || "Guest",
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
      setError("Add your name, rating, and review.");
      return;
    }
    try {
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
          displayDate: newReview.displayDate,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || data.msg || "Could not submit.");
        return;
      }
      const now =
        data.displayDate ||
        (data.createdOn
          ? new Date(data.createdOn).toLocaleString("en-US", { month: "long", year: "numeric" })
          : new Date().toLocaleString("en-US", { month: "long", year: "numeric" }));
      setReviews((current) => [
        {
          id: data._id || Date.now(),
          customerId: data.customerId || userId,
          name: data.name || newReview.name,
          date: now,
          stars: data.rating ?? newReview.stars,
          tag: data.title || newReview.tag,
          text: data.content || newReview.text,
        },
        ...current,
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

  const handleDelete = async (id) => {
  try {
    const response = await fetch(`http://localhost:5001/api/reviews/${id}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": token,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      console.error(data.message || "Failed to delete review");
      return;
    }
    // setReviews updates the reviews array, using the previous state of the array, it filters only the items that pass the condition
      // "Keep every review whose _id is not equal to the one we jsut deleted"
      setReviews((prev) => prev.filter((r) => r.id !== id));

    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Update review
  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/reviews/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ content: editContent, rating: editRating }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error(data.message || "Failed to update review");
        return;
      }
      setReviews((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, text: data.content, stars: data.rating } : r
        )
      );
      setEditingId(null);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="page reviews-page">
      <PageHero
        tone="dark"
        label="Community"
        title="Reviews"
        lede="What guests say after the first sip."
      />

      <div className="page-panel page-panel--green reviews-summary-panel">
        <div className="page-inner reviews-summary-row">
          <RatingSummary reviews={reviews} />
          <button type="button" className="btn-primary reviews-toggle" onClick={() => setFormOpen(!formOpen)}>
            {formOpen ? "Close form" : "Write a review"}
          </button>
        </div>
      </div>

      <div className="page-panel page-panel--white reviews-body">
        <div className="page-inner">
          {formOpen ? (
            <div className="review-form">
            <h2 className="section-heading">Your review</h2>
              {submitted ? (
                <p className="form-success">Thanks — your review was added.</p>
              ) : (
                <>
                  <div className="rf-row">
                    <div className="rf-field">
                      <label htmlFor="rev-name">Name</label>
                      <input
                        id="rev-name"
                        type="text"
                        placeholder="Your name"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      />
                    </div>
                    <div className="rf-field">
                      <label htmlFor="rev-tag">Favorite drink (optional)</label>
                      <input
                        id="rev-tag"
                        type="text"
                        placeholder="e.g. Honey matcha latte"
                        value={newReview.tag}
                        onChange={(e) => setNewReview({ ...newReview, tag: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="rf-field">
                    <span className="rf-label">Rating</span>
                    <Stars
                      count={newReview.stars}
                      interactive
                      onSet={(n) => setNewReview({ ...newReview, stars: n })}
                    />
                  </div>
                  <div className="rf-field">
                    <label htmlFor="rev-text">Comments</label>
                    <textarea
                      id="rev-text"
                      placeholder="How was your visit?"
                      rows={4}
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    />
                  </div>
                  {error ? <p className="rf-error">{error}</p> : null}
                  <button type="button" className="btn-primary" onClick={handleSubmit}>
                    Submit
                  </button>
                </>
              )}
            </div>
          ) : null}

          <div className="reviews-grid">
            {loading ? (
              <p className="muted">Loading…</p>
            ) : reviews.length === 0 ? (
              <p className="muted">No reviews yet.</p>
            ) : (
              reviews.map((review) => (
                <article className="review-card" key={review.id}>
                  <div className="review-card__top">
                    <div className="review-card__avatar" aria-hidden>
                      {(review.name && review.name[0]) || "G"}
                    </div>
                    <div>
                      <p className="review-card__name">{review.name}</p>
                      <p className="review-card__date muted">{review.date}</p>
                    </div>
                    <Stars count={review.stars} />
                  </div>

                   {/* Add title/tag */}
                  {review.tag && <p className="review-card__tag">{review.tag}</p>}

                  {/* Add review text/content */}
                  {review.text && <p className="review-card__text">{review.text}</p>}

                  {editingId === review.id ? (
                  // Inline edit form
                  <div className="review-edit-form">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={3}
                    />
                    <Stars
                      count={editRating}
                      interactive
                      onSet={(n) => setEditRating(n)}
                    />
                    <button className="btn-primary" onClick={() => handleUpdate(review.id)}>
                      Save
                    </button>
                    <button className="btn-secondary" onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </div>
                ) : null}

      
                {review.customerId?.toString() === userId?.toString() && (
                  <div className="review-card__actions">
                    <button className="btn-secondary" onClick={() => handleDelete(review.id)}>
                      Delete
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={() => {
                        setEditingId(review.id);
                        setEditContent(review.text);
                        setEditRating(review.stars);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                )}

                </article>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
