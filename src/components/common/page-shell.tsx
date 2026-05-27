import * as React from "react"

import { cn } from "@/lib/utils"

export function PageShell({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn("min-h-svh bg-[radial-gradient(circle_at_top_left,_rgba(244,245,247,0.9),_transparent_30%),linear-gradient(180deg,_#fbfcfe_0%,_#f6f8fb_100%)]", className)}
      {...props}
    />
  )
}
