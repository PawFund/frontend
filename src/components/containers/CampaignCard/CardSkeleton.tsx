import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
    return (
        <div className="flex flex-col gap-3 p-3">
            <Skeleton className="w-full h-52 rounded-3xl bg-gray-200" />
            <Skeleton className="w-full h-4 rounded-full bg-gray-200" />
            <Skeleton className="w-3/4 h-4 rounded-full bg-gray-200" />
        </div>
    );
}