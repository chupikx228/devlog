import {useState} from "react";
import {useUpdateSubtask} from "@/hooks/subtasks/useUpdateSubtask.ts";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Pencil} from "lucide-react";
import {toast} from "sonner";

export const EditSubtaskModal = ({ subtask }: { subtask: { id: string, title: string } }) => {

    const {mutate} = useUpdateSubtask()
    const [title, setTitle] = useState(subtask?.title)

    const [open, setOpen] = useState(false)

    const handleSubmit = () => {
        if (!title.trim()) return
        mutate({ id: subtask.id, title })
        setTitle('')
        setOpen(false)
    }
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button className="p-1 hover:opacity-70">
                        <Pencil size={14} />
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm bg-white" onOpenAutoFocus={(e) => e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>Edit Subtask</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Subtask title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={() => {handleSubmit()
                            toast.success("Subtask successfully edited!")}}
                        >Add</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}