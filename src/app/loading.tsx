"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export function LoadingProgress() {
    const [progress, setProgress] = React.useState(13)

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
    }, [])

    return <Progress value={progress} className="w-[60%]" />
}

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="flex flex-cols items-center justify-center mx-auto">
        <LoadingProgress />
    </div>
}