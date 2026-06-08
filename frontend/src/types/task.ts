import type {Subtask} from "./subtask.ts";


export interface Task {
    id: string
    title: string
    description: string
    status: 'TODO' | 'IN_PROGRESS' | 'DONE'
    priority: 'LOW' | 'MEDIUM' | 'HIGH'
    createdAt: string
    subtasks: Subtask[]
}
export interface CreateTaskArgs {
    title: string
    description: string
    status: string
    priority: string
}
export interface EditTaskArgs {
    id: string
    title?: string
    description?: string
    status?: string
    priority?: string
}

