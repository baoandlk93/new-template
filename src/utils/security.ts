import { IUser, ERole } from "@/server/entity";

export function getUserFromLocalStorage() {
  if (typeof window === "undefined") {
    return null;
  }
  const user = localStorage.getItem("user");
  return user ? (JSON.parse(user) as unknown as IUser) : null;
}
export function isTokenExpired() {
  const expiration = localStorage.getItem("tokenExpiration");

  if (!expiration) {
    return true; // Không có token hết hạn
  }
  return Date.now() > parseInt(expiration, 10);
}
export function setUserToLocalStorage(user: IUser) {
  if (typeof window === "undefined") {
    return;
  }
  const expirationTime = Date.now() + 60 * 60 * 1000 * 24 * 7;
  localStorage.setItem("tokenExpiration", expirationTime.toLocaleString()); // 7 day from now
  localStorage.setItem("user", JSON.stringify(user));
}

export function removeUserFromLocalStorage() {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem("user");
}
export function checkIsAdmin():boolean {
  const user = getUserFromLocalStorage();
  if (!user || !user.roles.some((r) => r.name === "ADMIN")) {
    return true;
  } else return false;
}
