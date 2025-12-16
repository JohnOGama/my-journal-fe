import { useQuery } from "@tanstack/react-query";
import { getUserAnalyticsAPI } from "./api";

interface useGetUserAnalyticsQuery {
  month?: string;
}

export const useGetUserAnalytics = (query?: useGetUserAnalyticsQuery) => {
  return useQuery({
    queryKey: ["user-analytics", query?.month],
    queryFn: () => getUserAnalyticsAPI(query?.month),
  });
};
