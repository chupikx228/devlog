import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "../../api/api.ts";
import type {CreateTaskArgs} from "../../types/task.ts";


export const useCreateTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data : CreateTaskArgs) => {
            return api.post('/tasks', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            })
        }
    })
}