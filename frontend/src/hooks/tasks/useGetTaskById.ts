import {useQuery} from "@tanstack/react-query";
import {api} from "@/api/api.ts";
import type {Task} from "@/types/task.ts";

export const useGetTaskById = (id: string) => {
    return useQuery({
        queryKey: ['task', id],
        queryFn: async () => {
            const res = await api.get<Task>(`/tasks/${id}`)
            return res.data
        }
    })
}