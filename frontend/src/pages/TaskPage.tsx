import { useParams } from "react-router";
import { useGetTaskById } from "@/hooks/tasks/useGetTaskById.ts";
import { STATUS_COLORS, PRIORITY_COLORS } from "../constants/taskUi.ts";
import { SubtaskList } from "../components/subtask/SubtaskList/SubtaskLisk.tsx";
import {SlackGenerateButton} from "@/components/task/SlackGenerateButton/SlackGenerateButton.tsx";
import {SubtaskModal} from "@/components/subtask/AddSubtaskModal/SubtaskModal.tsx";
import {EditTaskModal} from "@/components/task/EditTaskModal/EditTaskModal.tsx";
import {DeleteTaskButton} from "@/components/task/DeleteTaskButton/DeleteTaskButton.tsx";
import {AddFavoriteButton} from "@/components/task/AddFavoriteButton/AddFavoriteButton.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {EmptyState} from "@/components/common/EmptyState/EmptyState.tsx";

export const TaskPage = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetTaskById(id!);

    if (isLoading) return (
        <div className="p-[20px] flex flex-col gap-4">
            <Skeleton className="h-8 w-64 skeleton-animate" />
            <div className="flex gap-2">
                <Skeleton className="h-6 w-24 rounded-full skeleton-animate" />
                <Skeleton className="h-6 w-20 rounded-full skeleton-animate" />
            </div>
            <Skeleton className="h-4 w-full skeleton-animate" />
            <Skeleton className="h-4 w-3/4 skeleton-animate" />
        </div>
    )
    if (isError) return (
        <div className="flex flex-col items-center justify-center h-full gap-4 p-[20px]">
            <p className="text-4xl">⚠️</p>
            <p className="text-xl font-semibold">Something went wrong</p>
            <p className="text-gray-400 text-sm">Failed to load task. Please try again.</p>
            <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:opacity-80 transition-opacity"
            >
                Retry
            </button>
        </div>
    )
    if (!data) return <EmptyState />;


    return (
        <div className="p-[20px] fade-in">
            <div className="flex flex-wrap items-center">
                <p className="text-[25px] font-[600]">{data.title}</p>
                <AddFavoriteButton id={id}/>
                <EditTaskModal task={data}/>
                <DeleteTaskButton id={id}/>

            </div>

            <div className="flex gap-2 my-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium w-auto text-center ${STATUS_COLORS[data.status]} `}>
                    {data.status.replace(/_/g, ' ')}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium w-20 text-center ${PRIORITY_COLORS[data.priority]}`}>
                    {data.priority}
                </span>
            </div>
            <SlackGenerateButton id={id!} />


            <div className="py-[15px]">
                <p className="font-[400] pb-[5px]">Description</p>
                <p className="text-[#707070]">{data.description}</p>
            </div>


            <SubtaskList subtasks={data.subtasks} />
            <div className="pt-[10px]">
            <SubtaskModal taskId={id}/>
            </div>
        </div>
    );
};
