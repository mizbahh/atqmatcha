/*
  AI generated frontend for testing functionality. Not intended for production use.
*/

import { useState, useEffect, useRef, useMemo } from "react";
import Footer from "../components/Footer";
import "./ImagesPage.css";

const API_BASE_URL = "http://localhost:5001/api/images";

export default function ImagesPage() {
  const [imageData, setImageData] = useState([]);
  const [activeTag, setActiveTag] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [loaded, setLoaded] = useState({});
  const [cols, setCols] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const gridRef = useRef(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_BASE_URL);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch images");
        }

        const formattedImages = data.map((img, index) => ({
          id: img._id || `img-${index}`,
          src: img.src || "",
          alt: img.alt || "Gallery image",
          tag: img.tag || "Gallery",
          height: img.height || 300,
        }));

        setImageData(formattedImages);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Could not load gallery images.");
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  const allTags = useMemo(
    () => ["All", ...Array.from(new Set(imageData.map((img) => img.tag)))],
    [imageData]
  );

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCols(w < 600 ? 1 : w < 900 ? 2 : w < 1300 ? 3 : 4);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const filtered =
    activeTag === "All"
      ? imageData
      : imageData.filter((img) => img.tag === activeTag);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);

      if (lightbox !== null && filtered.length > 0) {
        if (e.key === "ArrowRight") {
          setLightbox((i) => (i + 1) % filtered.length);
        }

        if (e.key === "ArrowLeft") {
          setLightbox((i) => (i - 1 + filtered.length) % filtered.length);
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, filtered.length]);

  const columns = Array.from({ length: cols }, () => []);
  const colHeights = Array(cols).fill(0);

  filtered.forEach((img) => {
    const shortest = colHeights.indexOf(Math.min(...colHeights));
    columns[shortest].push(img);
    colHeights[shortest] += img.height;
  });

  const markLoaded = (id) => {
    setLoaded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="images-page">
      <div className="images-header">
        <div className="ih-bg">
          <div className="ih-orb ih-orb1" />
          <div className="ih-orb ih-orb2" />
          <div className="grain" />
        </div>

        <div className="ih-content">
          <p className="hero-eyebrow">✦ Moments Captured ✦ Every Pop-Up</p>
          <h1 className="images-title">Gallery</h1>
          <p className="images-subtitle">
            From morning prep to the last sip — our story in photos.
          </p>
        </div>
      </div>

      <div className="images-filters">
        <div className="filter-inner">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`filter-pill ${activeTag === tag ? "active" : ""}`}
              onClick={() => {
                setActiveTag(tag);
                setLightbox(null);
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="masonry-wrap" ref={gridRef}>
        {loading ? (
          <p>Loading gallery...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filtered.length === 0 ? (
          <p>No images found.</p>
        ) : (
          <div className="masonry-grid" style={{ "--cols": cols }}>
            {columns.map((col, ci) => (
              <div className="masonry-col" key={ci}>
                {col.map((img, idx) => {
                  const globalIdx = filtered.findIndex((item) => item.id === img.id);

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
        )}
      </div>

      {lightbox !== null && filtered[lightbox] && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lb-close" onClick={() => setLightbox(null)}>
            ✕
          </button>

          <button
            className="lb-arrow lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i - 1 + filtered.length) % filtered.length);
            }}
          >
            ‹
          </button>

          <div className="lb-inner" onClick={(e) => e.stopPropagation()}>
            <img src={filtered[lightbox].src} alt={filtered[lightbox].alt} />
            <div className="lb-caption">
              <span className="lb-tag">{filtered[lightbox].tag}</span>
              <p>{filtered[lightbox].alt}</p>
              <span className="lb-counter">
                {lightbox + 1} / {filtered.length}
              </span>
            </div>
          </div>

          <button
            className="lb-arrow lb-next"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i + 1) % filtered.length);
            }}
          >
            ›
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}