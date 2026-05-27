import * as React from "react"

import { cn } from "@/lib/utils"

type TabsContextValue = {
  value: string
  setValue: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

function Tabs({
  value: controlledValue,
  defaultValue,
  onValueChange,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  value?: string
  defaultValue: string
  onValueChange?: (value: string) => void
}) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)

  const value = controlledValue ?? uncontrolledValue

  const setValue = React.useCallback(
    (nextValue: string) => {
      onValueChange?.(nextValue)
      setUncontrolledValue(nextValue)
    },
    [onValueChange]
  )

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div data-slot="tabs" className={cn("flex flex-col gap-4", className)} {...props} />
    </TabsContext.Provider>
  )
}

function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="tabs-list"
      className={cn("inline-flex items-center rounded-xl bg-muted p-1 text-muted-foreground", className)}
      {...props}
    />
  )
}

function TabsTrigger({
  value,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  const context = React.useContext(TabsContext)

  if (!context) {
    throw new Error("TabsTrigger must be used inside Tabs")
  }

  const isActive = context.value === value

  return (
    <button
      type="button"
      data-slot="tabs-trigger"
      aria-pressed={isActive}
      onClick={() => context.setValue(value)}
      className={cn(
        "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
        isActive ? "bg-background text-foreground shadow-sm" : "hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  value,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const context = React.useContext(TabsContext)

  if (!context) {
    throw new Error("TabsContent must be used inside Tabs")
  }

  if (context.value !== value) {
    return null
  }

  return (
    <div data-slot="tabs-content" className={cn("outline-none", className)} {...props}>
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }

