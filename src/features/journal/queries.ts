import { useQuery } from "@tanstack/react-query";
import { getJournalAPI, getUserJournalsAPI } from "./api";

export const useGetUserJournals = (query?: {
  search?: string;
  type?: "ai" | "fts";
}) => {
  return useQuery({
    queryKey: ["journals", query?.search, query?.type],
    queryFn: () => getUserJournalsAPI(query),
  });
};

export const useGetJournal = (uid: string) => {
  return useQuery({
    queryKey: ["journal", uid],
    queryFn: () => getJournalAPI(uid),
    enabled: !!uid,
  });
};
