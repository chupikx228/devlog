import {Button} from "@/components/ui/button.tsx";
import {useGetSlackUpdate} from "@/hooks/tasks/useGetSlackUpdate.ts";
import {toast} from "sonner";

export const SlackGenerateButton = ({id} : {id: string}) => {
    const { refetch } = useGetSlackUpdate(id)

    const handleCopy = async () => {
        const { data } = await refetch()
        if (data) {
            await navigator.clipboard.writeText(data)
        }
    }

    return (
        <>
            <div className="py-[10px]">
                <Button
                    onClick={async () => {
                        await handleCopy()
                        toast.success("Copied to clipboard!")
                    }}
                    variant="outline"
                >
                    Generate Slack
                </Button>
            </div>

        </>
    )
}