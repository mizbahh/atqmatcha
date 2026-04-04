/*
  Blog page that fetches announcements from the backend and displays them in a blog format.
*/

/* 
  TODO: ADD ADMIN FUNCTIONALITY
*/

import { useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
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
    day: "numeric"
  });
}

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [activeTag, setActiveTag] = useState("All");
  const [openPost, setOpenPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetches announcements from backend
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
          readTime: post.readTime || "1 min"
        }));

        setPosts(formattedPosts);
      } catch (err) {
        console.error("Error fetching announcements:", err);
        setError("Could not load announcements.");
      } finally {
        setLoading(false);
      }
    }

    fetchAnnouncements();
  }, []);

  const filtered =
    activeTag === "All"
      ? posts
      : posts.filter((p) => p.tag === activeTag);

  const featured = posts.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured || activeTag !== "All");

  // Handles when a user clicks on a post
  if (openPost) {
    return (
      <div className="blog-page">
        <div className="post-view">
          <button className="post-back" onClick={() => setOpenPost(null)}>
            ← Back to Blog
          </button>

          <div className="post-content">
            <h1 className="post-title">{openPost.title}</h1>
            <div className="post-meta">{openPost.date}</div>

            <div className="post-body">
              {openPost.body.split("\n").map((line, i) =>
                line.trim() === "" ? (
                  <br key={i} />
                ) : line.trim().startsWith("•") ? (
                  <p key={i} className="post-bullet">{line.trim().substring(1).trim()}</p>
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

  // Handles when a user is on the main blog page
  return (
    <div className="blog-page">

      {/* Header construction */}
      <div className="page-header green-header">
        <div className="ph-bg">
          <div className="orb orb1" />
          <div className="orb orb2" />
          <div className="grain" />
        </div>

        <div className="ph-content">
          <p className="hero-eyebrow">✦ Stories & Updates</p>
          <h1 className="ph-title">Blog</h1>
          <p className="ph-sub">
            Announcements, behind-the-scenes, new items, and tea education — all in one place.
          </p>
        </div>
      </div>

      {/* Body construction */}
      <div className="blog-body">
        <div className="blog-grid">
          {rest.map((post, i) => (
            <div
              className="blog-card"
              key={post.id}
              style={{ animationDelay: `${i * 70}ms` }}
              onClick={() => setOpenPost(post)}
            >
              <h3 className="bc-title">{post.title}</h3>
              <p className="bc-excerpt">{post.excerpt}</p>
              <div className="bc-footer">
                <span className="bc-date">{post.date}</span>
                <span className="bc-cta">Read →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}