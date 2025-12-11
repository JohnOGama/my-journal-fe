import { authClient } from "@/libs/authClient";
import { useQuery } from "@tanstack/react-query";

export const useGetUserData = () => {
  return useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      const session = await authClient.getSession();
      return session?.data?.user;
    },
  });
};
