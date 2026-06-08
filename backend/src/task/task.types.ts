import {Subtask, Task} from "@prisma/client";

export type TaskWithSubtasks = Task & {subtasks: Subtask[]}