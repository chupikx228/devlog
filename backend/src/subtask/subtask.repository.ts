import {Injectable} from "@nestjs/common";
import {ISubtaskRepository} from "./subtask-repository.interface";
import {Prisma, Subtask} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class SubtaskRepository implements ISubtaskRepository {
    constructor(private prismaService: PrismaService) {}
    getSubtaskById(id: string): Promise<Subtask | null> {
        return this.prismaService.subtask.findUnique({where: {id}})
    }
    deleteSubtask(id: string): Promise<Subtask> {
        return this.prismaService.subtask.delete({where: {id}})
    }
    createSubtask(data: Prisma.SubtaskUncheckedCreateInput): Promise<Subtask> {
        return this.prismaService.subtask.create({data : data})
    }
    editSubtask(id: string, data: Prisma.SubtaskUncheckedUpdateInput): Promise<Subtask> {
        return this.prismaService.subtask.update({where: {id}, data : data})
    }


}