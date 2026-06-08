import {IsBoolean, IsNotEmpty, IsOptional} from "class-validator";

export class EditSubtaskDto {
    @IsOptional()
    @IsNotEmpty()
    title: string;


    @IsOptional()
    @IsBoolean()
    isDone: boolean;

    @IsOptional()
    @IsNotEmpty()
    taskId: string;
}