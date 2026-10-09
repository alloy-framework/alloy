import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[Devtools] Panel error:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="p-4 text-sm text-destructive">
          <div className="font-medium mb-1">Panel Error</div>
          <div className="text-xs text-muted-foreground">
            {this.state.error.message}
          </div>
          <button
            onClick={() => this.setState({ error: null })}
            className="mt-2 text-xs underline hover:text-foreground"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
