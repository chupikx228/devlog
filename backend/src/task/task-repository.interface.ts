import { Task, Prisma } from "@prisma/client";
import {TaskWithSubtasks} from "./task.types";

export interface ITaskRepository {
    getAllTasks(): Promise<Task[]>;
    getTaskById(id: string): Promise<TaskWithSubtasks | null>;
    deleteTask(id: string): Promise<Task>;
    createTask(data: Prisma.TaskCreateInput): Promise<Task>;
    editTask(id: string, data: Prisma.TaskUpdateInput): Promise<Task>;
}