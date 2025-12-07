import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createJournalAPI,
  createJournalBody,
  deleteJournalAPI,
  updateJournalAPI,
  updateJournalBody,
} from "./api";

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

export const useUpdateJournal = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ uid, body }: { uid: string; body: updateJournalBody }) =>
      updateJournalAPI(uid, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["journals"] });
      queryClient.invalidateQueries({ queryKey: ["journal", variables.uid] });
    },
  });
  return {
    updateJournalAsync: mutation.mutateAsync,
    isUpdating: mutation.isPending,
  };
};

export const useDeleteJournal = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (uid: string) => deleteJournalAPI(uid),
    onSuccess: (data, variables) => {
      console.log(data);
      console.log(variables);
      queryClient.invalidateQueries({ queryKey: ["journals"] });
      queryClient.invalidateQueries({ queryKey: ["journal", variables] });
    },
  });
  return {
    deleteJournalAsync: mutation.mutateAsync,
    isDeleting: mutation.isPending,
  };
};
