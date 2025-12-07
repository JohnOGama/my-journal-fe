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

export interface getJournal {
  uid: string;
  title: string;
  content: string;
  mood: string;
  createdAt: string;
  updatedAt: string;
}

export const getJournalAPI = (uid: string) => {
  return api.get<getJournal>(`${baseURL}/journal/${uid}`);
};

export interface updateJournalBody {
  title: string;
  mood: string;
  content: string;
}

export const updateJournalAPI = (uid: string, body: updateJournalBody) => {
  return api.patch(`${baseURL}/journal/${uid}`, body);
};

export const deleteJournalAPI = (uid: string) => {
  return api.delete(`${baseURL}/journal/${uid}`);
};
