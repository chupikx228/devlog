import { Component, type ReactNode } from "react"

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false, error: null }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error("ErrorBoundary caught:", error, info)
    }

    handleReload = () => window.location.reload()

    handleGoHome = () => {
        this.setState({ hasError: false, error: null })
        window.location.href = "/"
    }

    render() {
        if (!this.state.hasError) return this.props.children

        return (
            <div className="min-h-screen w-full flex items-center justify-center p-4">
                <div className="bg-background rounded-xl p-10 max-w-md w-full text-center">
                    <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                        <svg className="w-7 h-7 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>
                    </div>

                    <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-2">
                        Something went wrong
                    </p>
                    <h2 className="text-xl font-medium text-foreground mb-3">
                        Unexpected error occurred
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-7">
                        The application ran into a problem. Try reloading the page — if the issue persists, check the console for details.
                    </p>

                    <div className="flex gap-2 justify-center">
                        <button
                            onClick={this.handleReload}
                            className="inline-flex items-center gap-2 px-4 h-9 text-sm rounded-md border border-border hover:bg-accent transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            Reload page
                        </button>
                        <button
                            onClick={this.handleGoHome}
                            className="inline-flex items-center gap-2 px-4 h-9 text-sm rounded-md border border-border hover:bg-accent transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            Go home
                        </button>
                    </div>

                    {this.state.error && (
                        <details className="mt-6 text-left">
                            <summary className="text-xs text-muted-foreground cursor-pointer select-none">
                                Error details
                            </summary>
                            <pre className="mt-2 p-3 bg-muted rounded-md text-xs text-muted-foreground overflow-x-auto leading-relaxed font-mono">
                                {this.state.error.message}
                            </pre>
                        </details>
                    )}
                </div>
            </div>
        )
    }
}