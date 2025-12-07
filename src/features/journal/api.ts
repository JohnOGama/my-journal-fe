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
  return api.get<{ items: Journal[] }>(
    `${baseURL}/journal/user?${
      query
        ? `&${new URLSearchParams(query as Record<string, string>).toString()}`
        : ""
    }`
  );
};

export interface createJournalBody {
  title: string;
  mood: string;
  content: string;
}

export const createJournalAPI = (body: createJournalBody) => {
  return api.post(`${baseURL}/journal`, body);
};
