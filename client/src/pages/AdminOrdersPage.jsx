import { useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero.jsx";
import "./AdminOrdersPage.css";

const API_BASE_URL = "http://localhost:5001/api/orders";

function formatCurrency(value) {
  const amount = Number(value || 0);
  return Number.isFinite(amount)
    ? amount.toLocaleString("en-US", { style: "currency", currency: "USD" })
    : "$0.00";
}

function formatDate(value) {
  if (!value) return "Date unavailable";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Date unavailable";
  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function AdminOrdersPage({ onTabChange }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");
        const response = await fetch(API_BASE_URL, {
          headers: {
            "x-auth-token": token || "",
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to load orders.");
        }

        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading admin orders:", err);
        setError(err.message || "Could not load orders.");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const orderCountLabel = useMemo(() => {
    if (loading) return "Loading orders";
    return `${orders.length} order${orders.length === 1 ? "" : "s"}`;
  }, [loading, orders.length]);

  async function updateOrderStatus(orderId, status) {
    try {
      setUpdatingId(orderId);
      setStatusMessage("");
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token || "",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not update order.");
      }

      setOrders((prev) => prev.map((order) => (order._id === orderId ? data : order)));
      setStatusMessage(`Order updated to ${status}.`);
    } catch (err) {
      console.error("Error updating order status:", err);
      setStatusMessage(err.message || "Could not update order.");
    } finally {
      setUpdatingId("");
    }
  }

  return (
    <div className="page admin-orders-page">
      <PageHero
        tone="purple"
        label="Administrator access"
        title="All Orders"
        lede="Review every preorder submission, the username tied to it, and the items included in each request."
      />

      <div className="page-panel page-panel--dark">
        <div className="page-wide strip-bar admin-orders-strip">
          <p className="strip-bar__text">{orderCountLabel}</p>
          <div className="strip-bar__actions">
            <button type="button" className="strip-bar__btn" onClick={() => onTabChange("admin")}>
              Back to Admin View
            </button>
          </div>
        </div>
      </div>

      <div className="page-panel page-panel--white admin-orders-body">
        <div className="page-wide">
          {statusMessage ? <p className="admin-orders-feedback">{statusMessage}</p> : null}
          {loading ? <p className="muted">Loading orders…</p> : null}
          {!loading && error ? <p>{error}</p> : null}
          {!loading && !error && orders.length === 0 ? <p className="muted">No orders found.</p> : null}

          {!loading && !error && orders.length > 0 ? (
            <ul className="admin-orders-grid">
              {orders.map((order) => (
                <li key={order._id} className="admin-order-card">
                  <div className="admin-order-card__head">
                    <div>
                      <p className="admin-order-card__eyebrow">Order</p>
                      <h2 className="admin-order-card__title">#{order._id.slice(-6).toUpperCase()}</h2>
                    </div>
                    <span className={`admin-order-card__status status-${order.status || "pending"}`}>
                      {order.status || "pending"}
                    </span>
                  </div>

                  <dl className="admin-order-meta">
                    <div>
                      <dt>Username</dt>
                      <dd>{order.customerUsername || order.customerID?.username || "Unknown user"}</dd>
                    </div>
                    <div>
                      <dt>User ID</dt>
                      <dd>{order.customerID?._id || order.customerID || "N/A"}</dd>
                    </div>
                    <div>
                      <dt>Placed</dt>
                      <dd>{formatDate(order.createdOn)}</dd>
                    </div>
                    <div>
                      <dt>Total</dt>
                      <dd>{formatCurrency(order.total)}</dd>
                    </div>
                  </dl>

                  <div className="admin-order-items">
                    <p className="admin-order-items__label">Items</p>
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                      <ul>
                        {order.items.map((item, index) => (
                          <li key={`${order._id}-${index}`}>
                            <span>
                              {item.menuItemId?.name || "Menu item"} · Qty {item.quantity}
                              {item.option ? ` · ${item.option}` : ""}
                            </span>
                            <span>{formatCurrency(Number(item.price || 0) * Number(item.quantity || 0))}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="muted">No items listed.</p>
                    )}
                  </div>

                  <div className="admin-order-actions">
                    <button
                      type="button"
                      className="btn-ghost"
                      disabled={updatingId === order._id}
                      onClick={() => updateOrderStatus(order._id, "pending")}
                    >
                      Mark pending
                    </button>
                    <button
                      type="button"
                      className="btn-ghost"
                      disabled={updatingId === order._id}
                      onClick={() => updateOrderStatus(order._id, "completed")}
                    >
                      Mark completed
                    </button>
                    <button
                      type="button"
                      className="btn-ghost"
                      disabled={updatingId === order._id}
                      onClick={() => updateOrderStatus(order._id, "cancelled")}
                    >
                      Mark cancelled
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <Footer />
    </div>
  );
}
