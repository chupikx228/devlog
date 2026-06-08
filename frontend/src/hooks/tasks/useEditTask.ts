import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {EditTaskArgs} from "../../types/task.ts";
import {api} from "../../api/api.ts";

export const useEditTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: EditTaskArgs) => {
            return await api.patch(`tasks/${data.id}`, data);
        }, onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"],
                queryKey: ["task"],

            })
        }
    })
}