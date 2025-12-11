import { GetSessionDataT } from "@/types/session";

export const parseSessionData = (
  sessionDataValue?: string
): GetSessionDataT | null => {
  if (!sessionDataValue) return null;

  try {
    const [base64Data] = sessionDataValue.split(".");

    if (!base64Data) return null;

    const jsonString = Buffer.from(base64Data, "base64").toString("utf-8");
    const sessionData = JSON.parse(jsonString);

    return sessionData;
  } catch (error) {
    console.error("Failed to parse session data:", error);
    return null;
  }
};

export const hasSessionToken = (tokenValue?: string): boolean => {
  return !!tokenValue && tokenValue.length > 0;
};

export const checkTokenExpiration = (token?: string): boolean => {
  const decoded = parseSessionData(token);

  if (!decoded) return true;

  const now = new Date();
  const expiresAt = new Date(decoded.session.expiresAt);
  return now > expiresAt ? true : false;
};
