/*
  AI generated frontend for testing functionality. Not intended for production use.
*/

import { useState } from "react";
import Footer from "../components/Footer";
import "./BlogPage.css";

const posts = [
  {
    id: 1, tag: "Announcement", date: "March 28, 2026", featured: true,
    title: "We're Now at Oviedo Farmers Market Every Saturday!",
    excerpt: "Starting April 5th, you can find us at the Oviedo Farmers Market every single Saturday morning from 8am to 1pm. We've secured a permanent spot near the east entrance — look for the bamboo signage.",
    body: `Starting April 5th, you can find us at the Oviedo Farmers Market every single Saturday morning from 8am to 1pm. We've secured a permanent spot near the east entrance — look for the bamboo signage and the smell of fresh matcha.\n\nThis has been a long time coming. The Oviedo community has been so welcoming to us since we first showed up with a folding table and a whisk, and we're thrilled to make it official.\n\nWhat to expect every Saturday:\n• Full hot and iced drink menu\n• Rotating seasonal specials\n• Mochi and pastry selection\n• Preorder pickup available\n\nWe'll still be popping up at other markets and events throughout the month — check the Schedule tab to see everything coming up. See you Saturday!`,
    readTime: "2 min",
  },
  {
    id: 2, tag: "New Item", date: "March 20, 2026", featured: false,
    title: "Introducing the Spring Sakura Latte",
    excerpt: "For a limited time this April, we're offering our Sakura Matcha Latte — ceremonial grade matcha with house-made sakura syrup and oat milk, topped with a dried rose petal.",
    body: `For a limited time this April, we're offering our Sakura Matcha Latte — ceremonial grade matcha with house-made sakura syrup and oat milk, topped with a dried rose petal.\n\nThe sakura syrup is made in small batches using real cherry blossom extract. It's floral without being sweet, and it pairs beautifully with the grassy depth of the matcha.\n\nAvailable hot or iced. Ask for it by name — "Sakura Latte" — or preorder it through the Menu tab. Once sakura season is over, it's gone until next year.\n\nCome find it while it lasts.`,
    readTime: "1 min",
  },
  {
    id: 3, tag: "Behind the Scenes", date: "March 10, 2026", featured: false,
    title: "Where Our Matcha Comes From",
    excerpt: "We've been asked a lot about our sourcing, so we wanted to share the story behind the ceremonial grade matcha we use — from the tea fields of Uji, Japan to your cup.",
    body: `We've been asked a lot about our sourcing, so we wanted to share the story behind the ceremonial grade matcha we use.\n\nOur matcha is stone-ground in Uji, Japan — a city that has been producing the finest tea in the world for over 800 years. The tea plants are shade-grown for the last three to four weeks before harvest, which forces them to produce more chlorophyll and L-theanine. That's why high-quality matcha is so vividly green and why it gives you a calm, focused energy rather than a jittery caffeine spike.\n\nWe taste-test every new harvest before ordering. Ceremonial grade means it's meant to be consumed on its own with water or a light milk — no sugar needed to mask bitterness.\n\nWe import small batches to keep the matcha fresh. If it's been sitting in a warehouse for six months, it's not going to taste the way it should. Freshness matters enormously with matcha.\n\nQuestions about our sourcing? Come chat with us at the market — we love talking tea.`,
    readTime: "3 min",
  },
  {
    id: 4, tag: "Event Recap", date: "February 28, 2026", featured: false,
    title: "Winter Park Harvest Festival Recap",
    excerpt: "Last weekend's festival was our biggest event to date. Over 400 cups served, a sold-out mochi situation, and more new faces than we could count. Here's what happened.",
    body: `Last weekend's festival was our biggest event to date. Over 400 cups served, a sold-out mochi situation, and more new faces than we could count.\n\nThe line was out of control by 10am (sorry and also thank you). We ran out of mochi by noon and the hojicha shortbread was gone within the first hour. We hear you — we're scaling up for the next festival.\n\nHighlights:\n• 400+ cups served in 6 hours\n• New record for iced matcha lattes on a single day\n• Three proposals witnessed (coincidence? probably)\n• Two dogs in matching outfits\n\nThank you to everyone who waited patiently, said kind things, and came back for a second cup. You're why we do this.\n\nNext big event: Earth Day Pop-Up at Mead Botanical Garden on April 25th. Mark your calendars.`,
    readTime: "2 min",
  },
  {
    id: 5, tag: "Tip", date: "February 15, 2026", featured: false,
    title: "How to Store Matcha at Home",
    excerpt: "A few customers have asked us for tips on storing matcha between pop-ups. Here's everything you need to know to keep your matcha fresh and vibrant for as long as possible.",
    body: `A few customers have asked us for tips on storing matcha between pop-ups. Here's everything you need to know.\n\nThe three enemies of matcha are light, air, and moisture. Exposure to any of these will rapidly degrade the flavor and color.\n\nBest practices:\n• Store in an airtight, opaque container\n• Keep in the refrigerator (not the freezer)\n• Use within 4–6 weeks of opening\n• Always use a dry spoon — moisture causes clumping and faster oxidation\n• Don't store near strong-smelling foods\n\nIf your matcha has turned brownish or tastes bitter and flat, it's likely oxidized. It's still safe to drink but the flavor will be noticeably worse.\n\nWe sell our matcha in small tins for exactly this reason — the right amount to use before it starts to turn. Ask us at the next pop-up!`,
    readTime: "2 min",
  },
];

const allTags = ["All", ...Array.from(new Set(posts.map(p => p.tag)))];

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All");
  const [openPost,  setOpenPost]  = useState(null);

  const filtered = activeTag === "All" ? posts : posts.filter(p => p.tag === activeTag);
  const featured = posts.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured || activeTag !== "All");

  if (openPost) {
    return (
      <div className="blog-page">
        <div className="post-view">
          <button className="post-back" onClick={() => setOpenPost(null)}>← Back to Blog</button>
          <div className="post-content">
            <span className="post-tag">{openPost.tag}</span>
            <h1 className="post-title">{openPost.title}</h1>
            <div className="post-meta">{openPost.date} · {openPost.readTime} read</div>
            <div className="post-body">
              {openPost.body.split("\n").map((line, i) =>
                line.trim() === "" ? <br key={i} /> :
                line.startsWith("•") ? <p key={i} className="post-bullet">{line}</p> :
                <p key={i}>{line}</p>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="page-header green-header">
        <div className="ph-bg"><div className="orb orb1"/><div className="orb orb2"/><div className="grain"/></div>
        <div className="ph-content">
          <p className="hero-eyebrow">✦ Stories & Updates</p>
          <h1 className="ph-title">Blog</h1>
          <p className="ph-sub">Announcements, behind-the-scenes, new items, and tea education — all in one place.</p>
        </div>
      </div>

      <div className="blog-body">
        {/* Featured post */}
        {activeTag === "All" && featured && (
          <div className="featured-post" onClick={() => setOpenPost(featured)}>
            <div className="fp-content">
              <span className="post-tag featured-tag">{featured.tag}</span>
              <h2 className="fp-title">{featured.title}</h2>
              <p className="fp-excerpt">{featured.excerpt}</p>
              <div className="fp-meta">{featured.date} · {featured.readTime} read</div>
              <button className="btn-primary fp-btn">Read More →</button>
            </div>
            <div className="fp-visual">
              <div className="fp-deco">
                <span>抹茶</span>
              </div>
            </div>
          </div>
        )}

        {/* Tag filters */}
        <div className="blog-filters">
          {allTags.map(tag => (
            <button key={tag} className={`filter-pill ${activeTag === tag ? "active" : ""}`} onClick={() => setActiveTag(tag)}>
              {tag}
            </button>
          ))}
        </div>

        {/* Post grid */}
        <div className="blog-grid">
          {rest.map((post, i) => (
            <div
              className="blog-card" key={post.id}
              style={{ animationDelay: `${i * 70}ms` }}
              onClick={() => setOpenPost(post)}
            >
              <div className="bc-top">
                <span className="post-tag">{post.tag}</span>
                <span className="bc-read">{post.readTime} read</span>
              </div>
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
