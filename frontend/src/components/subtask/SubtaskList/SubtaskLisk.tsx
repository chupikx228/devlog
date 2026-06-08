import { Checkbox } from "@/components/ui/checkbox"
import {useUpdateSubtask} from "@/hooks/subtasks/useUpdateSubtask.ts";
import {EditSubtaskModal} from "@/components/subtask/EditSubtaskModal/EditSubtask.tsx";
import {DeleteSubtaskButton} from "@/components/subtask/DeleteSubtaskButton/DeleteSubtaskButton.tsx";


interface Subtask {
    id: string;
    title: string;
    isDone: boolean;
}

export const SubtaskList = ({ subtasks }: { subtasks: Subtask[] }) => {
    if (!subtasks || subtasks.length === 0) {
        return (
            <div>
                <p className="text-gray-500">No subtasks yet. Want to add one?</p>
            </div>
        )
    }

    const {mutate}= useUpdateSubtask()

    return (
        <div>
            <p className="font-[400] pb-[5px]">Subtasks</p>
            {subtasks.map(subtask => (
                <div key={subtask.id} className="flex items-center gap-2 py-1 max-w-full sm:max-w-[150px]">
                <Checkbox
                        checked={subtask.isDone}
                        onCheckedChange={(checked) => mutate({ id: subtask.id, isDone: checked as boolean })}
                    />
                    <p className="flex-1 ">{subtask.title}</p>
                    <EditSubtaskModal subtask={subtask} />
                    <DeleteSubtaskButton id={subtask.id} />
                </div>
            ))}

        </div>
    )
}