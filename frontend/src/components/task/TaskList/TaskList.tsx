import {useGetTasks} from "@/hooks/tasks/useGetTasks.ts";
import {Tabs,TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {TaskCard} from "@/components/task/TaskCard/TaskCard.tsx";
import {useState} from "react";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {EmptyState} from "@/components/common/EmptyState/EmptyState.tsx";

export const TaskList = () => {
    const [sortBy, setSortBy] = useState('status')

    const {data, isError, isLoading} = useGetTasks(sortBy);

    const [activeTab, setActiveTab] = useState("all");
    if (isLoading) return (
        <div className="flex flex-col w-full">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 border-b">
                    <Skeleton className="h-4 w-48" />
                    <div className="flex gap-3">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
            ))}
        </div>
    )
    if (isError) return <p>Something went wrong</p>
    if (data?.length === 0) return <EmptyState />

    return (

        <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 pr-[20px] py-[20px] gap-3">
            <TabsList variant="line" className="[&>[data-state=active]]:border-b-2 [&>[data-state=active]]:border-black">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="TODO">Todo</TabsTrigger>
                    <TabsTrigger value="IN_PROGRESS">In Progress</TabsTrigger>
                    <TabsTrigger value="DONE">Done</TabsTrigger>
                </TabsList>

                {data?.length !== 0 && <Select onValueChange={setSortBy} value={sortBy}>
                    <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Sort by"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sort by</SelectLabel>
                            <SelectItem value="date" className="opacity-100">Date</SelectItem>
                            <SelectItem value="status" className="opacity-100">Status</SelectItem>
                            <SelectItem value="priority" className="opacity-100">Priority</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                }
            </div>


            {data?.length !== 0 && (
                <>
            <TabsContent value="all">
                <div className="flex flex-col w-full">
                    {data?.map((task) => (
                        <TaskCard task={task} key={task.id} />
                    ))}
                    </div>
            </TabsContent>

            <TabsContent value="TODO">
                <div className="flex flex-col w-full">
                    {data?.filter(task => task.status === "TODO").map((task) => (
                        <TaskCard task={task} key={task.id} />
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="IN_PROGRESS">
                <div className="flex flex-col w-full">
                    {data?.filter(task => task.status === "IN_PROGRESS").map((task) => (
                        <TaskCard task={task} key={task.id} />
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="DONE">
                <div className="flex flex-col w-full">
                    {data?.filter(task => task.status === "DONE").map((task) => (
                        <TaskCard task={task} key={task.id} />
                    ))}
                </div>
            </TabsContent>
            </>
                )}</Tabs>
    )}