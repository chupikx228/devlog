import './App.css'
import {MainPage} from "./pages/MainPage.tsx";
import {Route, Routes} from "react-router";
import {TaskPage} from "@/pages/TaskPage.tsx";
import {SidebarProvider} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/common/Sidebar/Sidebar.tsx";
import {ChartPage} from "@/pages/ChartPage.tsx";
import { Toaster } from "@/components/ui/sonner"
import { SidebarTrigger } from "@/components/ui/sidebar.tsx"
import { ErrorBoundary } from "@/components/common/ErrorBoundary/ErrorBoundary"


function App() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1">
                <Toaster />
                <SidebarTrigger className="md:hidden m-2 bg-white" />
                <ErrorBoundary>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/task-page/:id" element={<TaskPage />} />
                        <Route path="/overview" element={<ChartPage />} />
                    </Routes>
                </ErrorBoundary>
            </main>
        </SidebarProvider>
    )
}

export default App