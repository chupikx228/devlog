import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {SubtaskService} from "./subtask.service";
import {CreateSubtaskDto} from "./dto/create-subtask.dto";
import {EditSubtaskDto} from "./dto/edit-subtask.dto";


@Controller('subtasks')
export class SubtaskController {
    constructor(private subtaskService: SubtaskService) {}

    @Post()
    async createSubtask(@Body() dto: CreateSubtaskDto){
        return this.subtaskService.createSubtask(dto)
    }

    @Patch(':id')
    async updateSubtask(@Param('id') id: string, @Body() dto: EditSubtaskDto ) {
        return this.subtaskService.updateSubtask(id, dto)
    }

    @Delete(':id')
    async deleteSubtask(@Param('id') id: string) {
        return this.subtaskService.deleteSubtask(id)
    }
    @Get(':id')
    async getSubtask(@Param('id') id: string) {
        return this.subtaskService.getSubtask(id)
    }

}