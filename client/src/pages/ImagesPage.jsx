/*
  Pinterest-inspired gallery page. Calls images from backend and displays them, including alt text for accessibility
*/

import { useState, useEffect, useRef} from "react";
import Footer from "../components/Footer";
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

  // Fetches images from backend API on component mount
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
        setError("Could not load gallery images.");
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  // Responsive column calculation based on window width
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCols(w < 600 ? 1 : w < 900 ? 2 : w < 1300 ? 3 : 4);
    };

    // Initial column setup and event listener for window resize
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Distributes images into columns based on their heights for a masonry layout
  imageData.forEach((img) => {
    const shortest = colHeights.indexOf(Math.min(...colHeights));
    columns[shortest].push(img);
    colHeights[shortest] += img.height;
  });

  // Marks an image as loaded to trigger CSS animations
  const markLoaded = (id) => {
    setLoaded((prev) => ({ ...prev, [id]: true }));
  };


  // Renders the gallery page with a header and a masonry grid of images
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

      {/* Pinterest-inspired image wrapping construction */}
      <div className="masonry-wrap">
        <div className="masonry-grid" style={{ "--cols": cols }}>
          {columns.map((col, ci) => (
            <div className="masonry-col" key={ci}>
              {col.map((img, idx) => (
                <div
                  key={img.id}
                  className={`masonry-item ${loaded[img.id] ? "loaded" : ""}`}
                  style={{ animationDelay: `${(ci * col.length + idx) * 60}ms` }}
                >
                  <div className="mi-img-wrap">
                    <img
                      src={img.src}
                      alt={img.alt}
                      onLoad={() => markLoaded(img.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}