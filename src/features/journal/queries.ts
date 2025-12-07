import { useQuery } from "@tanstack/react-query";
import { getUserJournalsAPI } from "./api";

export const useGetUserJournals = () => {
  return useQuery({
    queryKey: ["journals"],
    queryFn: () => getUserJournalsAPI(),
  });
};
