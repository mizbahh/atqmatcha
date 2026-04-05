import { jwtDecode } from "jwt-decode";

export function isAdmin() {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.role === "admin";
  } catch {
    return false;
  }
}
