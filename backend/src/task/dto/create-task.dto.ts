import {IsEnum, IsNotEmpty, IsString} from "class-validator";
import { Transform } from "class-transformer";
import {TaskStatus} from "./task-status.enum";

export class CreateTaskDto {
    @IsString()
    @Transform(({value}) => value?.trim())
    @IsNotEmpty()
    title: string;


    @IsString()
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty()

    description: string;

    @IsNotEmpty()
    priority: string;


    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus;



}