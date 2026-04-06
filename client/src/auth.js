import { jwtDecode } from "jwt-decode";

export function getDecodedToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("token");
    return null;
  }
}

export function getCurrentUser() {
  const decoded = getDecodedToken();
  return decoded?.user ?? null;
}

export function isAdmin() {
  const currentUser = getCurrentUser();
  return currentUser?.role === "admin";
}
