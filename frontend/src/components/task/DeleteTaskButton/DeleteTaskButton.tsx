import {useDeleteTask} from "@/hooks/tasks/useDeleteTask.ts";
import {useNavigate} from "react-router";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";

import {Trash2} from "lucide-react";
import {toast} from "sonner";

export const DeleteTaskButton = ({ id }: { id: string } ) => {
    const navigate = useNavigate()
    const { mutate } = useDeleteTask()
    return (
        <>
            <AlertDialog >
                <AlertDialogTrigger asChild>
                    <button className="p-1 hover:opacity-70 transition-opacity text-red-500">
                        <Trash2 size={16} />
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            Task from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => {
                        }}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                mutate(id)
                                navigate('/')
                                toast.success("Task Deleted successfully!")

                            }}
                        >Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}