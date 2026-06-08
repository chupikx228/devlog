import {IsEnum, IsOptional} from "class-validator";
import {TaskStatus} from "./task-status.enum";


export class EditTaskDto {

    @IsOptional()
    title?: string;

    @IsOptional()
    description?: string;


    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;


    @IsOptional()
    priority?: string;
}