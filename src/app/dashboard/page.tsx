import CourseForm from "@/components/course-form";
import { currentUser } from "@clerk/nextjs";

export default async function Dashboard() {
    const user = await currentUser()
    if (!user) {
        return null
    }

    if (user.privateMetadata[process.env.OPENAI_ASSISTANT_ID as string]) {
        return (
            <p>Courses</p>
        )
    }
    return (
        <div className="h-screen">
            <div className="max-w-md">
                <CourseForm />
            </div>
        </div>
    )
}