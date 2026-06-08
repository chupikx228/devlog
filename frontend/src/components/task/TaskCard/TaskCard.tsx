import type { Task } from "@/types/task"
import { Link } from "react-router"
import { STATUS_COLORS, PRIORITY_COLORS } from "@/constants/taskUi.ts";

interface TaskCardProps {
    task: Task
}



export const TaskCard = ({ task }: TaskCardProps) => {
    return (
        <Link to={`/task-page/${task.id}`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 border-b w-full fade-in gap-1">
                    <p className="font-medium">{task.title}</p>
                <div className="flex items-center gap-1 sm:gap-3 shrink-0">
                <span className={`px-2 py-1 rounded-full text-xs font-medium w-auto text-center ${STATUS_COLORS[task.status]}`}>
                    {task.status.replace(/_/g, ' ')}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium w-20 text-center ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</span>
                <span className="text-sm text-gray-400">{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
        </Link>
    )
}