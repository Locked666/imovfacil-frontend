import * as React from "react"

import { cn } from "@/lib/utils"
import { PageTitle } from "@/components/common/page-title"

interface SectionPageProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string
  title: string
  description?: string
  actions?: React.ReactNode
}

export function SectionPage({
  eyebrow,
  title,
  description,
  actions,
  className,
  children,
  ...props
}: SectionPageProps) {
  return (
    <div className={cn("mx-auto flex max-w-7xl flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <PageTitle eyebrow={eyebrow} title={title} description={description} />
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
      {children}
    </div>
  )
}
