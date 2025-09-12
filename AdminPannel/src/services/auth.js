export const login = ({ email, password }) => {
  if (email === import.meta.env.VITE_ADMIN_EMAIL && password === import.meta.env.VITE_ADMIN_PASSWORD) {
    localStorage.setItem("adminLoggedIn", "true");
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("adminLoggedIn");
};

export const isAuthenticated = () => {
  return localStorage.getItem("adminLoggedIn") === "true";
};
