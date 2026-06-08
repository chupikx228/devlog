import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {useEditTask} from "@/hooks/tasks/useEditTask.ts";
import type {Task} from "@/types/task.ts";
import { Pencil } from "lucide-react"
import {toast} from "sonner";


export const EditTaskModal = ({task} : {task: Task}) => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
    })

    const {mutate} = useEditTask();
    return(
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="pl-[10px]">
                    <button className="p-1 hover:opacity-70 transition-opacity" >
                        <Pencil size={16} />
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm bg-gray-50" onOpenAutoFocus={(e) => e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Task title"
                        value={data.title}
                        onChange={(e) => setData({...data, title: e.target.value})}

                    />
                    <Input
                        placeholder="Task description"
                        value={data.description}
                        onChange={(e) => setData({...data, description: e.target.value})}


                    />

                    <Select value={data.status} onValueChange={(value) => setData({...data, status: value })}>
                        <SelectTrigger className="w-full ">
                            <SelectValue placeholder="Select a Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="TODO">TODO</SelectItem>
                                <SelectItem value="IN_PROGRESS">IN PROGRESS</SelectItem>
                                <SelectItem value="DONE">DONE</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Select value={data.priority} onValueChange={(value) => setData({...data, priority: value })}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Priority</SelectLabel>
                                <SelectItem value="LOW">LOW</SelectItem>
                                <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                                <SelectItem value="HIGH">HIGH</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <DialogFooter className="flex-row justify-end gap-2 sm:flex-row">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={() =>{
                                mutate({ id: task.id, ...data })
                                setOpen(false)
                                toast.success("Task Edit Successfully!")
                        }} >Edit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
    )
}