import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "../../api/api.ts";
import type {CreateSubtaskArgs} from "../../types/subtask.ts";

export const useCreateSubtask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data : CreateSubtaskArgs) => {
            return api.post('subtasks', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks']})
            queryClient.invalidateQueries({queryKey: ['task']})
        }
    })
}