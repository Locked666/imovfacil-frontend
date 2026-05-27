import * as React from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string
  description?: string
  icon?: React.ReactNode
  className?: string
}

export function StatCard({
  title,
  value,
  description,
  icon,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("border-border/70 bg-background/90", className)}>
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="font-heading text-2xl font-semibold tracking-tight">{value}</p>
          {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
        </div>
        {icon ? (
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            {icon}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
