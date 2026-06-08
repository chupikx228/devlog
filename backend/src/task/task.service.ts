import {Inject, Injectable, NotFoundException} from "@nestjs/common";
import {TaskRepository} from "./task.repository";
import {Task} from "@prisma/client";
import {CreateTaskDto} from "./dto/create-task.dto";
import {EditTaskDto} from "./dto/edit-task.dto";
import type {ITaskRepository} from "./task-repository.interface";
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

export type TaskSortBy = 'status' | 'priority' | 'date'


@Injectable()
export class TaskService {
    constructor(@Inject('TASK_REPOSITORY') private taskRepository: ITaskRepository) {}



    async getAllTasks(sortBy: TaskSortBy = 'status') : Promise<Task[]> {

        const tasks = await this.taskRepository.getAllTasks()

        if(sortBy === 'priority') {
            return [...tasks].sort((a,b) => {
                const priorityA = a.priority as TaskPriority
                const priorityB = b.priority as TaskPriority
                return PRIORITY_ORDER[priorityA] - PRIORITY_ORDER[priorityB]
            })}

        if(sortBy === 'date') {
            return [...tasks].sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime())
        }

        return [...tasks].sort((a,b) => {
            const statusA = a.status as TaskStatus
            const statusB = b.status as TaskStatus
            return STATUS_ORDER[statusA] - STATUS_ORDER[statusB]
        })

    }
    async createTask(dto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(dto);
    }
    async deleteTask(taskId:string) : Promise<Task> {
        await this.getTaskById(taskId);

        return this.taskRepository.deleteTask(taskId);
    }
    async getTaskById(taskId:string) : Promise<Task> {
        const task = await this.taskRepository.getTaskById(taskId);
        if(!task){
            throw new NotFoundException(`Task with ID ${taskId} not found`);
        }
        return task
    }
    async editTask(taskId:string, dto: EditTaskDto) : Promise<Task> {
        await this.getTaskById(taskId);

        return this.taskRepository.editTask(taskId, dto);
    }
    async generateSlackUpdate(taskId:string) : Promise<string> {
        const task = await this.getTaskById(taskId) as TaskWithSubtasks
        const done = task.subtasks.filter(s => s.isDone).length
        const total = task.subtasks.length

        return `📋 ${task.title}
        📌 Status: ${task.status}
        🔥 Priority: ${task.priority}
        ✅ Subtasks: ${done}/${total} done
        🕐 Created: ${task.createdAt.toLocaleDateString()}`
    }
}