import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJournalAPI, createJournalBody } from "./api";

export const useCreateJournal = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (body: createJournalBody) => createJournalAPI(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journals"] });
    },
  });
  return {
    createJournalAsync: mutation.mutateAsync,
  };
};
