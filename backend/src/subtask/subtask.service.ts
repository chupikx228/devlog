import {Inject, Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import type {ISubtaskRepository} from "./subtask-repository.interface";
import {Prisma, Subtask} from "@prisma/client";
import {CreateSubtaskDto} from "./dto/create-subtask.dto";
import {EditSubtaskDto} from "./dto/edit-subtask.dto";


@Injectable()
export class SubtaskService {
    constructor( @Inject('SUBTASK_REPOSITORY') private subtaskRepository: ISubtaskRepository) {}

    async getSubtask(id: string): Promise<Subtask | null> {
        const subtask = await this.subtaskRepository.getSubtaskById(id);
        if (!subtask) {
            throw new NotFoundException(`Subtask with id ${id} not found`);
        }
        return subtask;
    }
    async deleteSubtask(id: string): Promise<Subtask> {
        await this.getSubtask(id)
        return this.subtaskRepository.deleteSubtask(id)
    }
    async createSubtask(dto:CreateSubtaskDto): Promise<Subtask> {
        return this.subtaskRepository.createSubtask(dto)
    }
    async updateSubtask(id: string, dto: EditSubtaskDto): Promise<Subtask> {
        await this.getSubtask(id)
        return this.subtaskRepository.editSubtask(id, dto)
    }


}