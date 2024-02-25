import { useMutation, useQueryClient } from "react-query";

import { EventItem } from "../../types/common";

import { addEvent, deleteEvent, editEvent } from "../../services/eventService";

export const useAddEventMutation = (onClose?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(addEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      onClose?.();
    },
  });
};

export const useEditEventMutation = (onClose?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation((params: EventItem) => editEvent(params), {
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
    onSettled: () => {
      onClose?.();
    },
  });
};

export const useDeleteEventMutation = (onClose?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => deleteEvent(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
    onSettled: () => {
      onClose?.();
    },
  });
};
