import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle} from "@/components/ui/empty.tsx";
import {CreateTaskModal} from "@/components/task/CreateTaskModal/CreateTaskModal.tsx";

export const EmptyState = () => {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyTitle>No Tasks Yet</EmptyTitle>
                <EmptyDescription>
                    You haven&apos;t created any tasks yet. Get started by creating
                    your first Task.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex justify-center gap-2">
                <div className="flex justify-center">
                <CreateTaskModal/>
                </div>
            </EmptyContent>
        </Empty>
    )
}