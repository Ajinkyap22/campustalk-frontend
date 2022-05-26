function useIsAuthenticated() {
  const token = localStorage.getItem("user");

  if (!token) return false;

  // check if token has expired
  if (token.expirationDate < new Date()) {
    localStorage.removeItem("user");
    return false;
  }

  return true;
}

export default useIsAuthenticated;
