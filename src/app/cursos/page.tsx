import { fetchCourses } from "@/actions"
import CourseForm from "@/components/course-form"
import CourseList from "@/components/course-list"
import { auth } from "@clerk/nextjs"

async function getData() {
    const { courses, error } = await fetchCourses()
    if (error) {
        console.error(error)
        return {
            error
        }
    }

    return {
        courses,
        error: null
    }
}

export default async function Courses() {
    const { userId } = auth()
    if (!userId) {
        return null
    }

    const { courses, error } = await getData()

    if (error || !courses) {
        return <p>Error fetching courses:{error}</p>
    }

    return (
        <>
            <CourseList courses={courses} />
        </>
    )
}