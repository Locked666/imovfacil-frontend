import * as React from "react"

import { cn } from "@/lib/utils"

type BadgeVariant = "default" | "secondary" | "outline" | "premium" | "destructive"

const badgeStyles: Record<BadgeVariant, string> = {
  default: "border-transparent bg-primary text-primary-foreground",
  secondary: "border-transparent bg-secondary text-secondary-foreground",
  outline: "border-border bg-background text-foreground",
  premium: "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-300",
  destructive: "border-transparent bg-destructive/15 text-destructive",
}

function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & { variant?: BadgeVariant }) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none",
        badgeStyles[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }

