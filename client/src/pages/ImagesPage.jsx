/*
  AI generated frontend for testing functionality. Not intended for production use.
*/

import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import "./ImagesPage.css";

// Placeholder images using Unsplash with matcha/tea/café themes
const imageData = [
  { id: 1,  src: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80", alt: "Matcha latte art in ceramic bowl",        tag: "Drinks",    height: 380 },
  { id: 2,  src: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80", alt: "Matcha powder and whisk on wood",        tag: "Ingredients", height: 260 },
  { id: 3,  src: "https://images.unsplash.com/photo-1627484164005-b54af5db33d2?w=600&q=80", alt: "Iced matcha latte with oat milk",         tag: "Iced",      height: 320 },
  { id: 4,  src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80", alt: "Farmers market pop-up booth",            tag: "Pop-Up",    height: 240 },
  { id: 5,  src: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80", alt: "Japanese tea ceremony close-up",           tag: "Ceremony",  height: 420 },
  { id: 6,  src: "https://images.unsplash.com/photo-1567922045116-2a00fae2ed03?w=600&q=80", alt: "Matcha cookies and pastries",            tag: "Food",      height: 300 },
  { id: 7,  src: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&q=80", alt: "Hot matcha latte in white ceramic mug",    tag: "Drinks",    height: 350 },
  { id: 8,  src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80", alt: "Hojicha roasted green tea preparation",  tag: "Hojicha",   height: 280 },
  { id: 9,  src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", alt: "Outdoor market morning setup",             tag: "Pop-Up",    height: 360 },
  { id: 10, src: "https://images.unsplash.com/photo-1531525727594-4b8abb5b1e4a?w=600&q=80", alt: "Matcha soft serve ice cream",           tag: "Food",      height: 290 },
  { id: 11, src: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&q=80", alt: "Barista preparing ceremonial matcha",    tag: "Behind the Scenes", height: 400 },
  { id: 12, src: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80", alt: "Matcha tonic with yuzu and ice",         tag: "Iced",      height: 270 },
  { id: 13, src: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80", alt: "Ceramic matcha bowl with bamboo whisk",  tag: "Ceremony",  height: 330 },
  { id: 14, src: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=600&q=80", alt: "Honey drizzle over matcha latte",        tag: "Drinks",    height: 390 },
  { id: 15, src: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&q=80", alt: "Matcha mochi on marble surface",         tag: "Food",      height: 250 },
  { id: 16, src: "https://images.unsplash.com/photo-1524350876685-274059332603?w=600&q=80", alt: "Morning market setup golden hour",       tag: "Pop-Up",    height: 310 },
];

const allTags = ["All", ...Array.from(new Set(imageData.map((i) => i.tag)))];

export default function ImagesPage() {
  const [activeTag,     setActiveTag]     = useState("All");
  const [lightbox,      setLightbox]      = useState(null); // index into filtered array
  const [loaded,        setLoaded]        = useState({});
  const [cols,          setCols]          = useState(3);
  const gridRef = useRef(null);

  // Responsive column count
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCols(w < 600 ? 1 : w < 900 ? 2 : w < 1300 ? 3 : 4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape")           setLightbox(null);
      if (e.key === "ArrowRight" && lightbox !== null) setLightbox((i) => (i + 1) % filtered.length);
      if (e.key === "ArrowLeft"  && lightbox !== null) setLightbox((i) => (i - 1 + filtered.length) % filtered.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const filtered = activeTag === "All" ? imageData : imageData.filter((i) => i.tag === activeTag);

  // Distribute into columns (top-to-bottom fill)
  const columns = Array.from({ length: cols }, () => []);
  const colHeights = Array(cols).fill(0);
  filtered.forEach((img) => {
    const shortest = colHeights.indexOf(Math.min(...colHeights));
    columns[shortest].push(img);
    colHeights[shortest] += img.height;
  });

  const markLoaded = (id) => setLoaded((prev) => ({ ...prev, [id]: true }));

  return (
    <div className="images-page">
      {/* Header */}
      <div className="images-header">
        <div className="ih-bg">
          <div className="ih-orb ih-orb1" />
          <div className="ih-orb ih-orb2" />
          <div className="grain" />
        </div>
        <div className="ih-content">
          <p className="hero-eyebrow">✦ Moments Captured ✦ Every Pop-Up</p>
          <h1 className="images-title">Gallery</h1>
          <p className="images-subtitle">From morning prep to the last sip — our story in photos.</p>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="images-filters">
        <div className="filter-inner">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`filter-pill ${activeTag === tag ? "active" : ""}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="masonry-wrap" ref={gridRef}>
        <div className="masonry-grid" style={{ "--cols": cols }}>
          {columns.map((col, ci) => (
            <div className="masonry-col" key={ci}>
              {col.map((img, idx) => {
                const globalIdx = filtered.indexOf(img);
                return (
                  <div
                    key={img.id}
                    className={`masonry-item ${loaded[img.id] ? "loaded" : ""}`}
                    style={{ animationDelay: `${(ci * col.length + idx) * 60}ms` }}
                    onClick={() => setLightbox(globalIdx)}
                  >
                    <div className="mi-img-wrap">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        onLoad={() => markLoaded(img.id)}
                        onError={(e) => {
                          // Fallback to a green placeholder on error
                          e.target.style.display = "none";
                          e.target.parentNode.classList.add("img-error");
                          markLoaded(img.id);
                        }}
                      />
                      <div className="mi-placeholder" />
                    </div>
                    <div className="mi-overlay">
                      <span className="mi-tag">{img.tag}</span>
                      <p className="mi-alt">{img.alt}</p>
                      <span className="mi-zoom">⊕</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lb-close" onClick={() => setLightbox(null)}>✕</button>
          <button
            className="lb-arrow lb-prev"
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i - 1 + filtered.length) % filtered.length); }}
          >‹</button>
          <div className="lb-inner" onClick={(e) => e.stopPropagation()}>
            <img src={filtered[lightbox].src.replace("w=600", "w=1200")} alt={filtered[lightbox].alt} />
            <div className="lb-caption">
              <span className="lb-tag">{filtered[lightbox].tag}</span>
              <p>{filtered[lightbox].alt}</p>
              <span className="lb-counter">{lightbox + 1} / {filtered.length}</span>
            </div>
          </div>
          <button
            className="lb-arrow lb-next"
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i + 1) % filtered.length); }}
          >›</button>
        </div>
      )}

      <Footer />
    </div>
  );
}
