import {api} from "@/api/api.ts";
import {useQuery} from "@tanstack/react-query";

export const useGetSlackUpdate = (id: string) => {
    return useQuery({
        queryKey: ['slack', id],
        queryFn: async () => {
            const res = await api.get<string>(`/tasks/${id}/slack-report`)
            return res.data
        },
        enabled: false
    })
}