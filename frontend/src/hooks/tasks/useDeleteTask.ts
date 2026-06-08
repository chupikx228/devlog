import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "../../api/api.ts";


export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            return api.delete(`tasks/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            })
        }

    })
}