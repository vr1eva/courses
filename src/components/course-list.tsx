import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CourseListProps, CourseMetadata, CoursePreviewProps, UserMetadata } from "@/types"
import { archiveCoursePreview, toggleCourseBookmark } from "@/actions"
import Image from "next/image"
import { currentUser } from "@clerk/nextjs"

export default async function CourseList({ courses }: CourseListProps) {
    const user = await currentUser()
    if (!user) {
        return null
    }
    return (
        courses.map(course => (
            <CoursePreview course={course} key={course.id} />
        ))
    )
}

async function CoursePreview({ course }: CoursePreviewProps) {
    const metadata = course.metadata as CourseMetadata
    const user = await currentUser()
    if (!user) {
        return null
    }
    const { bookmarks } = user.privateMetadata as UserMetadata
    let isBookmarked
    if (!bookmarks || !bookmarks.includes(course.id)) {
        isBookmarked = false
    } else {
        isBookmarked = true
    }
    const toggleCourseBookmarkWithBookmarkStatus = toggleCourseBookmark.bind(null, isBookmarked)
    return (
        metadata.archived ? null :
            <Card key={course.id}>
                <CardHeader>
                    <CardTitle>{metadata.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>{metadata.description}</CardDescription>
                </CardContent>
                <CardFooter className="gap-2">
                    <Link href={"/curso/" + course.id}>
                        <Button>Ver curso</Button>
                    </Link>
                    <form action={toggleCourseBookmarkWithBookmarkStatus}>
                        <input readOnly value={course.id} name="courseId" hidden />
                        <Button type="submit" variant="outline">
                            <Image height={24} width={24} src={isBookmarked ? "/bookmarked.svg" : "/bookmark.svg"} alt="bookmark status" />
                        </Button>
                    </form>
                    {process.env.MAINTENANCE_MODE === 'active' ?
                        <form action={archiveCoursePreview}>
                            <input readOnly value={course.id} name="courseId" hidden />
                            <Button type="submit" variant="destructive">Archive</Button>
                        </form> : null}
                </CardFooter>
            </Card>
    )
}