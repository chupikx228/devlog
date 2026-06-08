import {Prisma, Subtask} from "@prisma/client";


export interface ISubtaskRepository {
    getSubtaskById(id: string): Promise<Subtask | null>
    deleteSubtask(id: string): Promise<Subtask>;
    createSubtask(data: Prisma.SubtaskUncheckedCreateInput): Promise<Subtask>
    editSubtask(id: string, data: Prisma.SubtaskUncheckedUpdateInput): Promise<Subtask>
}