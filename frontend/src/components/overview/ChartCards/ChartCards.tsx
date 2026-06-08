import {useGetTasks} from "@/hooks/tasks/useGetTasks.ts";

export const ChartCards = () => {
    const {data} = useGetTasks()

    return (
        <div className="grid grid-cols-2 sm:flex sm:gap-4 gap-3">
        <div className="flex-1 border rounded-xl p-5 shadow-sm bg-white">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Total Tasks</p>
                <p className="text-3xl font-bold mt-1">{data?.length ?? 0}</p>
            </div>
            <div className="flex-1 border rounded-xl p-5 shadow-sm bg-white">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Done</p>
                <p className="text-3xl font-bold mt-1 text-green-500">
                    {data?.filter(t => t.status === 'DONE').length ?? 0}
                </p>
            </div>
            <div className="flex-1 border rounded-xl p-5 shadow-sm bg-white">
                <p className="text-xs text-gray-400 uppercase tracking-wide">In Progress</p>
                <p className="text-3xl font-bold mt-1 text-blue-500">
                    {data?.filter(t => t.status === 'IN_PROGRESS').length ?? 0}
                </p>
            </div>
            <div className="flex-1 border rounded-xl p-5 shadow-sm bg-white">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Todo</p>
                <p className="text-3xl font-bold mt-1 text-gray-400">
                    {data?.filter(t => t.status === 'TODO').length ?? 0}
                </p>
            </div>
        </div>
    )
}