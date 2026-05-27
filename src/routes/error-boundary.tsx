import * as React from "react"
import { AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class AppErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-svh items-center justify-center bg-background p-6">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle />
                Ocorreu um erro na interface
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                A aplicação encontrou um problema inesperado. Recarregue para tentar novamente.
              </p>
              <Button onClick={() => window.location.reload()}>Recarregar</Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

