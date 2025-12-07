import { useQuery } from "@tanstack/react-query";
import { getJournalAPI, getUserJournalsAPI } from "./api";

export const useGetUserJournals = () => {
  return useQuery({
    queryKey: ["journals"],
    queryFn: () => getUserJournalsAPI(),
  });
};

export const useGetJournal = (uid: string) => {
  return useQuery({
    queryKey: ["journal", uid],
    queryFn: () => getJournalAPI(uid),
    enabled: !!uid,
  });
};
