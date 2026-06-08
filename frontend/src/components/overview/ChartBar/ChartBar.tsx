import {BarChart, CartesianGrid, Cell} from "recharts";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart.tsx";
import {Bar, XAxis} from "recharts";
import {useGetTasks} from "@/hooks/tasks/useGetTasks.ts";



export const ChartBar = () => {

    const chartConfig = {
        TODO: { label: "Todo"},
        IN_PROGRESS: { label: "In Progress"},
        DONE: { label: "Done" },
    }
    const colors = ['#94a3b8', '#6366f1', '#22c55e']
    const {data} = useGetTasks()

    const chartData = [
        { status: 'TODO', count: data?.filter(t => t.status === 'TODO').length ?? 0 },
        { status: 'IN_PROGRESS', count: data?.filter(t => t.status === 'IN_PROGRESS').length ?? 0 },
        { status: 'DONE', count: data?.filter(t => t.status === 'DONE').length ?? 0 },
    ]

    return (
        <>
            <ChartContainer config={chartConfig} className="h-[200px] w-full max-w-full sm:max-w-[400px]">
            <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="status"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.replace('_', ' ')}
                    />
                    <ChartTooltip content={<ChartTooltipContent className="bg-white" />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="count" radius={4}>
                        {chartData.map((_, index) => (
                            <Cell key={index} fill={colors[index]} />
                        ))}
                    </Bar>
                </BarChart>
            </ChartContainer>
        </>
    )
}