import { Skeleton } from "components/ui";

const SkeletonLoading = () => {
    return(
        <div className="w-full mt-3">
            <div className="flex flex-col border border-gray-150 dark:border-dark-600">
                <div className="flex space-x-5 px-5 py-4">
                    {/* <Skeleton animate={false} className="size-16 rounded-full" /> */}
                    <div className="flex flex-1 flex-col justify-between py-2">
                        <Skeleton animate={true} className="h-3 w-2/12 rounded" />
                        <Skeleton animate={true} className="h-3 w-2/12 rounded mt-2" />
                    </div>
                </div>
                <div className="flex space-x-5 px-5 py-4">
                    <Skeleton animate={true} className="h-48 w-full" />
                </div>
                <div className="w-full px-6 py-4">
                    <Skeleton animate={true} className="h-3 w-full rounded" />
                    <Skeleton animate={true} className="mt-4 h-3 w-8/12 rounded" />
                </div>
            </div>
        </div>
    )
}

export default SkeletonLoading;