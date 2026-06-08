import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "../../api/api.ts";

export const useDeleteSubtask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id : string) => {
            return api.delete(`subtask/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['tasks']});
            queryClient.invalidateQueries({queryKey:['task']});

        }
    })
}