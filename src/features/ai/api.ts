import { baseURL } from "@/common/constants";
import { api } from "../api";

export interface GeneratedAiWeekSummaryI {
  createdAt: string;
  content: string;
  uid: string;
}

export const getGeneratedAiWeekSummaryAPI = () => {
  return api.get<GeneratedAiWeekSummaryI>(`${baseURL}/analytics/ai`);
};
