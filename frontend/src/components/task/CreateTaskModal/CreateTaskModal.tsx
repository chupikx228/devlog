import {useCreateTask} from "@/hooks/tasks/useCreateTask.ts";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Plus} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {useNavigate} from "react-router";
import {toast} from "sonner";
import {useSidebar} from "@/components/ui/sidebar.tsx";

export const CreateTaskModal = () => {

    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')

    const {mutate} = useCreateTask()
    const navigate = useNavigate()

    const [data, setData] = useState({
        title: "",
        description: "",
        status: "",
        priority: "",
    })


    const handleSubmit = () => {
        if (!data.title.trim() || !data.status || !data.priority) return
        mutate({ ...data })
        setOpen(false)
    }
    const { setOpenMobile } = useSidebar()

    return(
        <>
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogTrigger asChild>
                    <button className="flex items-center gap-2 w-full px-2 py-1 hover:bg-gray-50 rounded">
                        <Plus size={16} />
                        <span>Create Task</span>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm bg-white" onOpenAutoFocus={(e) => e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>Create Task</DialogTitle>
                        {error && <p className="text-red-500 text-xs">{error}</p>}

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
                            if (!data.title.trim() || !data.status || !data.priority) {
                                setError('Please fill all required fields')
                                return
                            }
                            mutate({ ...data })
                            setData({ title: "", description: "", status: "", priority: "" })
                            setOpen(false)
                            navigate("/")
                            setOpenMobile(false)
                            toast.success("Task Created Successfully!")
                        }} >Create</Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </>
    )
}