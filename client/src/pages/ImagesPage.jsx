import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero.jsx";
import "./ImagesPage.css";

const API_BASE_URL = "http://localhost:5001/api/images";

export default function ImagesPage() {
  const [imageData, setImageData] = useState([]);
  const [loaded, setLoaded] = useState({});
  const [cols, setCols] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const columns = Array.from({ length: cols }, () => []);
  const colHeights = Array(cols).fill(0);

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
          height: img.height || 300,
        }));
        setImageData(formattedImages);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Could not load images.");
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCols(w < 600 ? 1 : w < 900 ? 2 : w < 1300 ? 3 : 4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  imageData.forEach((img) => {
    const shortest = colHeights.indexOf(Math.min(...colHeights));
    columns[shortest].push(img);
    colHeights[shortest] += img.height;
  });

  const markLoaded = (id) => {
    setLoaded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="page images-page">
      <PageHero
        tone="mist"
        label="Gallery"
        title="Photos"
        lede="Pop-ups, drinks, and behind the bar."
      />

      <div className="page-panel page-panel--white images-body">
        <div className="page-wide">
          {loading ? (
            <p className="images-status muted">Loading…</p>
          ) : error ? (
            <p className="images-status">{error}</p>
          ) : imageData.length === 0 ? (
            <p className="images-status muted">No photos yet.</p>
          ) : (
            <div className="masonry-grid" style={{ "--cols": cols }}>
              {columns.map((col, ci) => (
                <div className="masonry-col" key={ci}>
                  {col.map((img, idx) => (
                    <div
                      key={img.id}
                      className={`masonry-item ${loaded[img.id] ? "loaded" : ""}`}
                      style={{ animationDelay: `${(ci * col.length + idx) * 40}ms` }}
                    >
                      <div className="masonry-item__frame">
                        <img src={img.src} alt={img.alt} onLoad={() => markLoaded(img.id)} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
