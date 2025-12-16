import { baseURL } from "@/common/constants";
import { api } from "../api";

export interface getUserAnalyticsInterface {
  totalJournals: number;
  averageWords: number;
  entriesDates: Date[];
  month: string;
}

export const getUserAnalyticsAPI = (yearMonth?: string) => {
  return api.get<getUserAnalyticsInterface>(
    `${baseURL}/analytics/user${yearMonth ? `?month=${yearMonth}` : ""}`,
  );
};
