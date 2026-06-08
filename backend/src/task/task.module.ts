import {Module} from "@nestjs/common";
import {PrismaModule} from "../prisma/prisma.module";
import {TaskController} from "./task.controller";
import {TaskService} from "./task.service";
import {TaskRepository} from "./task.repository";


@Module({
    imports: [PrismaModule],
    controllers: [TaskController],
    providers: [TaskService,
        {
            provide: "TASK_REPOSITORY",
            useClass: TaskRepository
        }],
})
export class TaskModule {}