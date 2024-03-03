"use server"
import OpenAI from "openai"
import { CreateCourseArgs, CreateCourseResponse, CreateThreadArgs, CreateThreadResponse, FetchCoursesResponse } from "./types"
import { auth, clerkClient } from "@clerk/nextjs";
import { revalidatePath } from "next/cache"
import { CourseMetadata } from "@/types"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function createThread({ title }: CreateThreadArgs): Promise<CreateThreadResponse> {
    const { userId } = auth()
    if (!userId) {
        return { error: "User not authenticated." }
    }
    const thread = await openai.beta.threads.create()

    if (!thread) {
        return { error: "Could not create course thread." }
    }

    const userHoldingCoursesThread = await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
            [process.env.OPENAI_ASSISTANT_ID as string]: thread.id
        }
    });

    if (!userHoldingCoursesThread) {
        return {
            error: "Failed to save course thread id to user metadata."
        }
    }
    revalidatePath("/dashboard")

    return {
        thread: { id: thread.id },
        error: null
    }
}

export async function createCourse({ title }: CreateCourseArgs): Promise<CreateCourseResponse> {
    const { userId } = auth()
    if (!userId) {
        return { error: "User not authenticated." }
    }
    const course = await openai.beta.threads.messages.create(process.env.OPENAI_THREAD_ID as string, {
        role: "user",
        content: title,
        metadata: {
            title,
            description: "Finally understand what  your co-workers mean when they say JSON or API. If you have a computer this course is for you!",
            speaker: "Randhall",
            avatar: "https://res.cloudinary.com/dkzaozc1s/image/upload/v1709330503/avatar_hjf3zu.png",
            organization: "Plummcorp",
            thumbnail: "https://res.cloudinary.com/dkzaozc1s/image/upload/v1709330328/placeholder_fxdgww.png",
            duration: "2 hours and 2 minutes",
            cc: true
        }
    })


    if (!course) {
        return { error: "Could not create course thread." }
    }

    revalidatePath("/dashboard")

    return {
        course,
        error: null
    }
}

export async function fetchCourses(): Promise<FetchCoursesResponse> {
    if (process.env.OPENAI_THREAD_ID) {
        const courses = await openai.beta.threads.messages.list(process.env.OPENAI_THREAD_ID as string)

        if (!courses) {
            return {
                error: "Could not fetch courses"
            }
        }
        return {
            courses: courses.data,
            error: null
        }
    }
    return {
        error: "Missing OPENAI_THREAD_ID environment variable."
    }
}

export async function archiveCoursePreview(formData: FormData) {
    const courseId = formData.get("courseId") as string
    const threadId = process.env.OPENAI_THREAD_ID as string
    if (!courseId || !threadId) {
        throw new Error("Error fetching course and/or thread ids.")
    }
    const archivedPreview = await openai.beta.threads.messages.update(
        threadId, courseId,
        {
            metadata: {
                archived: true,
            }
        }
    )

    if (!archivedPreview) {
        throw new Error("Could not update course preview.")
    }
    console.log(archivedPreview)

    revalidatePath("/cursos")
}