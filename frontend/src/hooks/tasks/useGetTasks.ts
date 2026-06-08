import {useQuery} from "@tanstack/react-query";
import {api} from "../../api/api.ts";
import type {Task} from "../../types/task.ts";

export const useGetTasks = (sortBy: string = 'status') => {
    return useQuery({
        queryKey:['tasks', sortBy],
        queryFn: async () => {
            const res = await api.get<Task[]>('/tasks', {params: {sortBy}});
            return res.data
        }

    })
}