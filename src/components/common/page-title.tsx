import * as React from "react"

import { cn } from "@/lib/utils"

interface PageTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string
  title: string
  description?: string
}

export function PageTitle({
  eyebrow,
  title,
  description,
  className,
  ...props
}: PageTitleProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {eyebrow}
        </span>
      ) : null}
      <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      {description ? <p className="max-w-3xl text-sm text-muted-foreground">{description}</p> : null}
    </div>
  )
}
