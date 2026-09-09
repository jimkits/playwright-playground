// Mock, in-memory-only auth. Session is stored in sessionStorage purely so a
// login survives navigating between pages within the same tab (there is no
// backend); it is intentionally cleared whenever the tab is closed.

const CREDENTIALS = { username: "admin", password: "admin123" };
const SESSION_KEY = "playlab-auth";

export function login(username, password) {
  if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
    sessionStorage.setItem(SESSION_KEY, "1");
    return true;
  }
  return false;
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn() {
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

export const MOCK_CREDENTIALS = CREDENTIALS;
