const tokenKey = 'amity-auth-token';
const authRedirectKey = 'success-auth-redirect';
const loginPlaceholderKey = 'login-email-placeholder';

export const userIsSignedIn = (): boolean => {
  return !!localStorage.getItem(tokenKey);
};

export const getAuthToken = (): string|null => {
  return localStorage.getItem(tokenKey);
};

export const getAuthHeaders = (): { Authorization: string }|{} => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const saveAuthToken = (token: string): void => {
  localStorage.setItem(tokenKey, token);
};

export const clearAuthToken = (): void => {
  localStorage.removeItem(tokenKey);
};

export const getAuthSuccessRedirect = (): string => {
  return sessionStorage.getItem(authRedirectKey) || '/';
};

export const setPostAuthRedirect = (uri: string): void => {
  sessionStorage.setItem(authRedirectKey, uri);
};

export const clearAuthSuccessRedirect = () => {
  sessionStorage.removeItem(authRedirectKey);
};

export const setLoginPlaceholderEmail = (email: string) => {
  localStorage.setItem(loginPlaceholderKey, email);
};

export const getLoginPlaceholderEmail = () => {
  return localStorage.getItem(loginPlaceholderKey);
};
