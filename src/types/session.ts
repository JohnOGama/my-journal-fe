export type Session = {
  expiresAt: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string;
  userAgent: string;
  userId: string;
  id: string;
};

export type User = {
  name: string;
  email: string;
  image: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
};

export type GetSessionDataT = {
  session: Session;
  user: User;
};

export type SessionData = {
  name: string;
  value: string;
};

export type SessionToken = {
  name: string;
  value: string;
};
