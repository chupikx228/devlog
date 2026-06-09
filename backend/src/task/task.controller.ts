import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {AppService} from "../app.service";
import {CreateTaskDto} from "./dto/create-task.dto";
import {EditTaskDto} from "./dto/edit-task.dto";
import type { TaskSortBy } from "./task.service"
import { TaskService } from "./task.service"

@Controller("tasks")

export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get()
    getAllTask(@Query('sortBy') sortBy: TaskSortBy = 'status'){
        return this.taskService.getAllTasks(sortBy)
    }

    @Get(":id")
    getTask(@Param("id") id: string){
        return this.taskService.getTaskById(id)
    }
    @Get(":id/slack-report")
    getSlackUpdate(@Param("id") id: string){
        return this.taskService.generateSlackUpdate(id)
    }

    @Post()
    createTask(@Body() dto: CreateTaskDto){
        return this.taskService.createTask(dto)
    }

    @Delete(":id")
    deleteTask(@Param("id") id: string){
        return this.taskService.deleteTask(id)
    }
    @Patch(":id")
    editTask(@Param("id") id: string, @Body() dto: EditTaskDto){
        return this.taskService.editTask(id, dto)
    }

}