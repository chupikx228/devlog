export interface Subtask {
    id: string
    title: string
    isDone: boolean
    taskId: string
}

export interface CreateSubtaskArgs {
    title: string
    taskId: string
}
export interface EditSubtaskArgs {
    id: string
    title?: string
    isDone?: boolean
    taskId?: string
}