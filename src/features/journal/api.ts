import { baseURL } from "@/common/constants";
import { api } from "../api";

interface getUserJournalQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface Journal {
  id: string;
  uid: string;
  title: string;
  content: string;
  mood: string;
  createdAt: string;
  updatedAt: string;
}

export const getUserJournalsAPI = (query?: getUserJournalQuery) => {
  return api<{ items: Journal[] }>(
    `${baseURL}/journal/user?${
      query
        ? `&${new URLSearchParams(query as Record<string, string>).toString()}`
        : ""
    }`
  );
};
