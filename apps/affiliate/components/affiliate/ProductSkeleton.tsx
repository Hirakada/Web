import { Card } from "@hirakada/ui";

export default function ProductSkeleton() {
  return <Card className="animate-pulse">
    <div className="aspect-square bg-(--color-surface-elevated)" />
    <div className="space-y-3 p-4 sm:p-5">
      <div className="h-3 w-2/5 rounded bg-(--color-primary-subtle)" />
      <div className="h-5 w-4/5 rounded bg-(--color-primary-subtle)" />
      <div className="h-4 w-full rounded bg-(--color-primary-subtle)" />
      <div className="h-4 w-3/4 rounded bg-(--color-primary-subtle)" />
    </div>
  </Card>;
}
