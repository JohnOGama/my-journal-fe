import { authClient } from "../libs/authClient";

/**
 * Sign out the user - clears the session cookie via the auth client
 */
export const signOut = async (): Promise<void> => {
  try {
    await authClient.signOut();
  } catch {
    // Ignore errors during signout
  }
};

/**
 * Check if the user is authenticated by verifying session cookie is valid
 */
export const checkAuth = async (): Promise<boolean> => {
  try {
    const session = await authClient.getSession();
    return !!session?.data?.user;
  } catch {
    return false;
  }
};
