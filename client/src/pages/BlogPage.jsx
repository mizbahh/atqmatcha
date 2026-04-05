import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero.jsx";
import "./BlogPage.css";

const API_BASE_URL = "http://localhost:5001/api/announcements";

function formatDate(dateString) {
  const parsedDate = new Date(dateString);
  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }
  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [openPost, setOpenPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch announcements");
        }
        const data = await response.json();
        const formattedPosts = data.map((post) => ({
          id: post._id,
          date: post.displayDate || formatDate(post.createdOn),
          featured: post.featured || false,
          title: post.title || "",
          excerpt: post.excerpt || "",
          body: post.body || "",
          readTime: post.readTime || "1 min",
          tag: post.tag,
        }));
        setPosts(formattedPosts);
      } catch (err) {
        console.error("Error fetching announcements:", err);
        setError("Could not load posts.");
      } finally {
        setLoading(false);
      }
    }
    fetchAnnouncements();
  }, []);

  if (openPost) {
    return (
      <div className="page blog-page">
        <PageHero tone="purple" title={openPost.title} lede={openPost.date} />
        <div className="page-panel page-panel--white post-article">
          <div className="page-inner post-inner">
            <button type="button" className="post-back" onClick={() => setOpenPost(null)}>
              ← Back
            </button>
            <div className="post-body">
              {openPost.body.split("\n").map((line, i) =>
                line.trim() === "" ? (
                  <br key={i} />
                ) : line.trim().startsWith("•") ? (
                  <p key={i} className="post-bullet">
                    {line.trim().substring(1).trim()}
                  </p>
                ) : (
                  <p key={i}>{line}</p>
                )
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page blog-page">
      <PageHero
        tone="green"
        label="Updates"
        title="Blog"
        lede="Announcements, new drinks, and notes from the road."
      />

      <div className="page-panel page-panel--mist blog-toolbar">
        <div className="page-inner">
          {loading ? (
            <p className="muted">Loading…</p>
          ) : error ? (
            <p>{error}</p>
          ) : posts.length === 0 ? (
            <p className="muted">No posts yet.</p>
          ) : (
            <ul className="blog-grid">
              {posts.map((post) => (
                <li key={post.id}>
                  <button type="button" className="blog-card" onClick={() => setOpenPost(post)}>
                    <span className="blog-card__date">{post.date}</span>
                    <h2 className="blog-card__title">{post.title}</h2>
                    {post.excerpt ? <p className="blog-card__excerpt">{post.excerpt}</p> : null}
                    <span className="blog-card__cta">Read</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
