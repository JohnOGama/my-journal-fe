import { useQuery } from "@tanstack/react-query";
import { getGeneratedAiWeekSummaryAPI } from "./api";

export const useGeneratedAiWeekSummaryQuery = () => {
  return useQuery({
    queryKey: ["generated-ai-week-summary"],
    queryFn: () => getGeneratedAiWeekSummaryAPI(),
  });
};
