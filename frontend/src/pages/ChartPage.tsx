import {ChartBar} from "@/components/overview/ChartBar/ChartBar.tsx";
import {ChartCards} from "@/components/overview/ChartCards/ChartCards.tsx";
import {EmptyState} from "@/components/common/EmptyState/EmptyState.tsx";
import {useGetTasks} from "@/hooks/tasks/useGetTasks.ts";

export const ChartPage = () => {
    const { data, isLoading } = useGetTasks()

    if (isLoading) return null
    if (!data || data.length === 0) return <EmptyState />
    return (
        <>
            <div className="p-4 sm:p-8 flex flex-col gap-8 fade-in">
                <div>
                    <p className="text-2xl font-bold mb-1">Overview</p>
                    <p className="text-gray-400 text-sm">Task statistics for your team</p>
                </div>
                <div className="flex justify-center bg-gray-50 rounded-xl p-6">
                    <ChartBar/>
                </div>
                <ChartCards/>
            </div>
        </>
    )
}