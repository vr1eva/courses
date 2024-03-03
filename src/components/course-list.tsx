import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { CourseListProps, CourseMetadata, CoursePreviewProps } from "@/types"
import CourseForm from "./course-form"

export default async function CourseList({ courses }: CourseListProps) {
    return (
        <>
            {process.env.MAINTENANCE_MODE ? <CourseForm /> : null}
            {courses.map(course => (
                <CoursePreview course={course} key={course.id} />
            ))}
        </>
    )
}

function CoursePreview({ course }: CoursePreviewProps) {
    const metadata = course.metadata as CourseMetadata
    return (
        <Card key={course.id}>
            <CardHeader>
                <CardTitle>{metadata.title}</CardTitle>

            </CardHeader>
            <CardContent>
                <CardDescription>{metadata.description}</CardDescription>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}