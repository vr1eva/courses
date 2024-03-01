"use server"
import OpenAI from "openai"
import { CreateCourseArgs, CreateCourseResponse } from "./types"
import { auth, clerkClient } from "@clerk/nextjs";
import { revalidatePath } from "next/cache"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function createCourse({ title }: CreateCourseArgs): Promise<CreateCourseResponse> {
    const { userId } = auth()
    if (!userId) {
        return { error: "User not authenticated." }
    }
    const courseThread = await openai.beta.threads.create({
        metadata: {
            title,
            speaker: "Randhall",
            avatar: "https://res.cloudinary.com/dkzaozc1s/image/upload/v1709330503/avatar_hjf3zu.png",
            organization: "Plummcorp",
            thumbnail: "https://res.cloudinary.com/dkzaozc1s/image/upload/v1709330328/placeholder_fxdgww.png",
            duration: "2 hours and 2 minutes",
            cc: true
        }
    })

    if (!courseThread) {
        return { error: "Could not create course thread." }
    }

    const userHoldingCourseThread = await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
            [process.env.OPENAI_ASSISTANT_ID as string]: courseThread.id
        }
    });

    if (!userHoldingCourseThread) {
        return {
            error: "Failed to save course thread id to user metadata."
        }
    }
    revalidatePath("/dashboard")

    return {
        course: { id: courseThread.id },
        error: null
    }
}