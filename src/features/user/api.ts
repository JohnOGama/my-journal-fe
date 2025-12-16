import { baseURL } from "@/common/constants";
import { api } from "../api";
import { User } from "better-auth/client";

export const getUserDataAPI = () => {
  return api.get<{
    journalEntries: { totalJournals: number };
    user: User;
  }>(`${baseURL}/auth/me`);
};
