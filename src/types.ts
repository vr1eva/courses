import { ThreadMessage } from "openai/resources/beta/threads/index.mjs"
import { object } from "zod"

export type ActionErrorResponse = null | string

export type Thread = {
    id: string
}

export type Course = {
    id: string,
    object: string,
    created_at: number,
    metadata: CourseMetadata
}

export type CourseMetadata = {
    title: string,
    speaker: string,
    avatar: string,
    organization: string,
    thumbnail: string,
    duration: string,
    cc: boolean,
    description: string
}

export type CreateThreadResponse = {
    error: ActionErrorResponse
    thread?: Thread
}

export interface CreateThreadArgs {
    title: string
}

export type FetchCoursesResponse = {
    courses?: ThreadMessage[],
    error: ActionErrorResponse
}

export interface CourseListProps {
    courses: ThreadMessage[]
}

export interface CreateCourseArgs {
    title: string
}

export type CreateCourseResponse = {
    course?: ThreadMessage
    error: ActionErrorResponse
}

export interface CoursePreviewProps {
    course: ThreadMessage
}
