import { CoursePageProps } from "@/types";

export default function CoursePage({ params }: CoursePageProps) {
    return (
        <div>
            Course page for course with id: {params.id}
        </div>
    )
}