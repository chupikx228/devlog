import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {Prisma, Task} from "@prisma/client";
import {ITaskRepository} from "./task-repository.interface";
import {TaskPriority, TaskStatus} from "./dto/task-status.enum";
import {TaskWithSubtasks} from "./task.types";


const STATUS_ORDER: Record<TaskStatus, number> = {
    [TaskStatus.IN_PROGRESS]: 1,
    [TaskStatus.TODO]: 2,
    [TaskStatus.DONE]: 3,
};

const PRIORITY_ORDER: Record<TaskPriority, number> = {
    [TaskPriority.HIGH]: 1,
    [TaskPriority.MEDIUM]: 2,
    [TaskPriority.LOW]: 3,
};

@Injectable()
export class TaskRepository implements ITaskRepository {
    constructor(private prismaService: PrismaService) {}

    async getAllTasks() : Promise<Task[]> {
        const tasks = await this.prismaService.task.findMany({
            include: {subtasks: true}
        })
        return tasks;
    }


    async getTaskById(id: string) : Promise<TaskWithSubtasks| null> {
        return this.prismaService.task.findUnique({
            where: {id: id},
            include: {subtasks: true}
        })
    }

    async deleteTask(id: string) : Promise<Task> {
        return this.prismaService.task.delete({
            where: {id: id}
        })
    }

    async createTask(data: Prisma.TaskCreateInput) : Promise<Task> {
        return this.prismaService.task.create({
            data:data,
        })
    }

    async editTask(id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
        return this.prismaService.task.update({
            where: {id},
            data: data
        })
    }


}