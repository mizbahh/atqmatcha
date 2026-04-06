import Footer from "../components/Footer";
import PageHero from "../components/PageHero.jsx";
import "./AdminViewPage.css";

export default function AdminViewPage({ onTabChange }) {
  return (
    <div className="page admin-view-page">
      <PageHero
        tone="green"
        label="Administrator access"
        title="Admin View"
        lede="Manage internal site activity, review customer orders, and jump to admin-only tools from one place."
      />

      <div className="page-panel page-panel--dark">
        <div className="page-wide strip-bar">
          <p className="strip-bar__text">
            This area is only for administrators. Use it to review activity and manage content tied to the pop-up.
          </p>
          <div className="strip-bar__actions">
            <button type="button" className="strip-bar__btn" onClick={() => onTabChange("adminOrders")}>
              View orders
            </button>
            <button type="button" className="strip-bar__btn" onClick={() => onTabChange("blog")}>
              Announcements
            </button>
            <button type="button" className="strip-bar__btn" onClick={() => onTabChange("schedule")}>
              Schedule
            </button>
          </div>
        </div>
      </div>

      <div className="page-panel page-panel--white admin-view-body">
        <div className="page-inner">
          <h2 className="section-heading">Admin tools</h2>
          <ul className="admin-tool-grid">
            <li>
              <button type="button" className="admin-tool-card" onClick={() => onTabChange("adminOrders")}>
                <span className="admin-tool-card__title">View Orders</span>
                <span className="admin-tool-card__text">
                  Open the admin orders page and review every preorder along with the username it belongs to.
                </span>
              </button>
            </li>
            <li>
              <button type="button" className="admin-tool-card" onClick={() => onTabChange("blog")}>
                <span className="admin-tool-card__title">Blog & Announcements</span>
                <span className="admin-tool-card__text">
                  Go to the announcements section to review what customers currently see on the public site.
                </span>
              </button>
            </li>
            <li>
              <button type="button" className="admin-tool-card" onClick={() => onTabChange("schedule")}>
                <span className="admin-tool-card__title">Schedule</span>
                <span className="admin-tool-card__text">
                  Check the upcoming pop-up schedule and keep event-facing information consistent across pages.
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
