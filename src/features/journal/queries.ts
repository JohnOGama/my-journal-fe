import { useQuery } from "@tanstack/react-query";
import { getJournalAPI, getUserJournalsAPI } from "./api";

export const useGetUserJournals = (query?: { search?: string }) => {
  return useQuery({
    queryKey: ["journals", query?.search],
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
