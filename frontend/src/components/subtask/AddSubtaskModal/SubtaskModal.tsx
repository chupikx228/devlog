import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {useCreateSubtask} from "@/hooks/subtasks/useCreateSubtask.ts";
import {toast} from "sonner";

export const SubtaskModal = ({ taskId }: { taskId: string }) => {
    const [title, setTitle] = useState('')
    const { mutate } = useCreateSubtask()

    const [open, setOpen] = useState(false)

    const handleSubmit = () => {
        if (!title.trim()) return
        mutate({ title, taskId })
        setTitle('')
        setOpen(false)
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Subtask</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm bg-white" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Add Subtask</DialogTitle>
                </DialogHeader>
                <Input
                    placeholder="Subtask title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <DialogFooter className="flex-row justify-end gap-2 sm:flex-row">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={() => {handleSubmit()
                        toast.success("Subtask added successfully!")
                    }}>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
