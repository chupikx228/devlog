import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenuItem,
    SidebarMenu,
    SidebarMenuButton,
    SidebarHeader,
    SidebarSeparator, useSidebar,
} from "@/components/ui/sidebar"
import { ClipboardList, LayoutDashboard, Star } from "lucide-react"
import { Link } from "react-router";
import { CreateTaskModal } from "@/components/task/CreateTaskModal/CreateTaskModal.tsx";
import {useFavoriteStore} from "@/store/useFavoriteStore.ts";
import {useGetTasks} from "@/hooks/tasks/useGetTasks.ts";
import { useLocation } from "react-router"


const items = [
    { title: "All Tasks", icon: ClipboardList, url: "/" },
    { title: "Overview", icon: LayoutDashboard, url: "/overview" },
]

export const AppSidebar = () => {
    const { favorites, toggleFavorite } = useFavoriteStore()
    const { data } = useGetTasks()
    const favoriteTasks = data?.filter(task => favorites.includes(task.id)) ?? []
    const location = useLocation()
    const { setOpenMobile } = useSidebar()

    return (
        <Sidebar>
            <SidebarHeader className="p-4">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">DevLog</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            to={item.url}
                                            onClick={() => setOpenMobile(false)}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${location.pathname === item.url
                                                ? 'bg-gray-100 text-gray-900 font-medium'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                        >
                                            <item.icon size={16} />
                                            <span className="text-sm font-medium">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <CreateTaskModal />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                <SidebarGroup>
                    <SidebarGroupLabel className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wide">
                        <Star size={12} />
                        Favorites
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                {favoriteTasks.length === 0 ? (
                                    <p className="px-2 py-1 text-xs text-gray-400">No favorites yet</p>
                                ) : (
                                    favoriteTasks.map(task => (
                                        <SidebarMenuItem key={task.id}>
                                            <SidebarMenuButton asChild>
                                                <Link to={`/task-page/${task.id}`} className="flex items-center gap-2" onClick={() => setOpenMobile(false)}>
                                                    <Star
                                                        size={12}
                                                        fill="#facc15"
                                                        stroke="#facc15"
                                                        className="shrink-0 hover:fill-transparent hover:stroke-yellow-400 transition-all cursor-pointer"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            toggleFavorite(task.id)
                                                        }}
                                                    />
                                                    <span className="truncate text-sm hover:text-yellow-500 transition-colors">
                                                        {task.title}
                                                    </span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))
                                )}
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}