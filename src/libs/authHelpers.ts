import { authClient } from "./authClient";
import { authStorage } from "./authStorage";

/**
 * Sign out the user - clears the token from localStorage and calls the auth client signOut
 */
export const signOut = async (): Promise<void> => {
  try {
    await authClient.signOut();
  } catch {
    // Ignore errors during signout
  } finally {
    authStorage.removeToken();
  }
};

/**
 * Check if the user is authenticated by verifying token exists and session is valid
 */
export const checkAuth = async (): Promise<boolean> => {
  const token = authStorage.getToken();
  if (!token) return false;

  try {
    const session = await authClient.getSession();
    if (session?.error || !session?.data?.user) {
      authStorage.removeToken();
      return false;
    }
    return true;
  } catch {
    authStorage.removeToken();
    return false;
  }
};

