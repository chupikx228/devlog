import {Inject, Module} from "@nestjs/common";
import {SubtaskController} from "./subtask.controller";
import {SubtaskService} from "./subtask.service";
import {PrismaModule} from "../prisma/prisma.module";
import {SubtaskRepository} from "./subtask.repository";


@Module({
    imports: [PrismaModule],
    controllers: [SubtaskController],
    providers: [SubtaskService,
        {
            provide:'SUBTASK_REPOSITORY',
            useClass: SubtaskRepository
        }],
})
export class SubtaskModule {}