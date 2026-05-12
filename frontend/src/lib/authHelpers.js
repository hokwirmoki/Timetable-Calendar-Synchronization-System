// Commit 1/5 - Testing git workflow
// Commit 2/5 - Added documentation and helper comment
// Commit 3/5 - Added isAuthenticated helper
// Commit 4/5 - Added clearAuthData helper
// Commit 5/5 - Added logout helper function

// Auth helpers for token management and user context
export const getAuthToken = () => localStorage.getItem('token');
export const setAuthToken = (token) => localStorage.setItem('token', token);
export const removeAuthToken = () => localStorage.removeItem('token');

export const getUserContext = () => {
  const token = getAuthToken();
  if (!token) return null;
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
  return !!token;
};

export const clearAuthData = () => {
  removeAuthToken();
  localStorage.removeItem('user');
  localStorage.removeItem('role');
};

// Final helper: Complete logout function
export const logout = () => {
  clearAuthData();
  // You can add window.location.href = '/login' later if needed
  console.log('User logged out successfully');
};


