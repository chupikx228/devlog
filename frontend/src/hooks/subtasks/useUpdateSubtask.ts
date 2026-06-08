import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "../../api/api.ts";
import type {EditSubtaskArgs} from "../../types/subtask.ts";

export const useUpdateSubtask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: EditSubtaskArgs) => {
            return api.patch (`subtask/${data.id}`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['tasks']})
            queryClient.invalidateQueries({queryKey:['task']})

        }
    })
}