// Commit 1/5 - Testing git workflow
// Commit 2/5 - Added documentation and helper comment
// Auth helpers for token management and user context
export const getAuthToken = () => localStorage.getItem('token');
export const setAuthToken = (token) => localStorage.setItem('token', token);
export const removeAuthToken = () => localStorage.removeItem('token');

export const getUserContext = () => {
  const token = getAuthToken();
  if (!token) return null;
  // Basic manual decode for simplicity. Alternative is adding jwt-decode.
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};
export const isAuthenticated = () => {
  const token = getAuthToken();
  return !!token; // Returns true if token exists
};


