import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero.jsx";
import "./AdminBlogPage.css";

const API_BASE_URL = "http://localhost:5001/api/announcements";

// Available tags
const TAGS = ["New Item", "Announcement", "Behind The Scenes", "Event Recap", "Tip"];

function formatDate(dateString) {
  const parsedDate = new Date(dateString);
  if (Number.isNaN(parsedDate.getTime())) return "Date unavailable";
  return parsedDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    body: "",
    featured: false,
    tag: TAGS[0], // default to first tag
  });

  // Fetch posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
      setError("Could not load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  // Create or Update post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const method = editingPost ? "PUT" : "POST";
      const url = editingPost ? `${API_BASE_URL}/${editingPost._id}` : API_BASE_URL;

      const response = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "x-auth-token": token
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Failed to save post");

      // Reset form and states
      setEditingPost(null);
      setIsCreating(false);
      setFormData({ title: "", excerpt: "", body: "", featured: false, tag: TAGS[0] });
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert("Error saving post");
    }
  };

  // Delete post
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE", headers: { "x-auth-token": token } });
      if (!response.ok) throw new Error("Failed to delete post");
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert("Error deleting post");
    }
  };

  // Start editing
  const startEdit = (post) => {
    setEditingPost(post);
    setIsCreating(false);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      body: post.body,
      featured: post.featured || false,
      tag: post.tag || TAGS[0],
    });
  };

  return (
    <div className="page blog-page">
      <PageHero tone="green" label="Admin" title="Blog Management" lede="Add, edit, or remove posts" />

      <div className="page-panel page-panel--white page-inner">
        {/* Add new post button */}
        <button
          onClick={() => {
            setEditingPost(null);
            setFormData({ title: "", excerpt: "", body: "", featured: false, tag: TAGS[0] });
            setIsCreating(true);
          }}
          className="admin-btn"
        >
          + Add New Post
        </button>

        {/* Post form */}
        {(editingPost !== null || isCreating) && (
          <form className="blog-form" onSubmit={handleSubmit}>
            <h3>{editingPost ? "Edit Post" : "New Post"}</h3>

            <label>Title</label>
            <input name="title" value={formData.title} onChange={handleChange} required />

            <label>Excerpt</label>
            <input name="excerpt" value={formData.excerpt} onChange={handleChange} />

            <label>Body</label>
            <textarea name="body" value={formData.body} onChange={handleChange} required />

           {/*} Depricated feature for now, can be added back later if needed
            <label>
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} /> Featured
            </label>
              */}

            <label>Tag</label>
            <select name="tag" value={formData.tag} onChange={handleChange}>
              {TAGS.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            <button type="submit">{editingPost ? "Update Post" : "Create Post"}</button>
          </form>
        )}

        {/* Post list */}
        {loading ? <p>Loading…</p> : error ? <p>{error}</p> : (
          <ul className="blog-grid">
            {posts.map(post => (
              <li key={post._id}>
                <div className="blog-card-admin">
                  <span>{formatDate(post.displayDate || post.createdOn)}</span>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <div className="blog-card-actions">
                    <button onClick={() => startEdit(post)}>Edit</button>
                    <button onClick={() => handleDelete(post._id)}>Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Footer />
    </div>
  );
}