import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PropertyCardSkeleton() {
  return (
    <Card>
      <CardHeader className="p-0">
        <Skeleton className="aspect-[16/10] rounded-t-2xl" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-5">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
      </CardContent>
      <CardFooter className="gap-2 pt-0">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="size-10 rounded-xl" />
        <Skeleton className="size-10 rounded-xl" />
      </CardFooter>
    </Card>
  )
}

