import {IsBoolean, IsNotEmpty} from "class-validator";


export class CreateSubtaskDto {
    @IsNotEmpty()
    title: string;


    @IsNotEmpty()
    taskId: string;
}