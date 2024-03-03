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
import { CourseListProps, CourseMetadata, CoursePreviewProps } from "@/types"
import CourseForm from "./course-form"
import { archiveCoursePreview } from "@/actions"

export default async function CourseList({ courses }: CourseListProps) {
    return (
        courses.map(course => (
            <CoursePreview course={course} key={course.id} />
        ))
    )
}

function CoursePreview({ course }: CoursePreviewProps) {
    const metadata = course.metadata as CourseMetadata
    return (
        metadata.archived ? null :
            <Card key={course.id}>
                <CardHeader>
                    <CardTitle>{metadata.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>{metadata.description}</CardDescription>
                </CardContent>
                <CardFooter>
                    <Link href={"/curso/" + course.id}>
                        <Button>Ver curso</Button>
                    </Link>
                    {process.env.MAINTENANCE_MODE === 'active' ?
                        <form action={archiveCoursePreview}>
                            <input readOnly value={course.id} name="courseId" hidden />
                            <Button type="submit" variant="destructive">Archive</Button>
                        </form> : null}
                </CardFooter>
            </Card>
    )
}