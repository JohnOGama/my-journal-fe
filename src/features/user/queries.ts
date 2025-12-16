import { useQuery } from "@tanstack/react-query";
import { getUserDataAPI } from "./api";

export const useGetUserData = () => {
  return useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      return getUserDataAPI();
    },
  });
};
