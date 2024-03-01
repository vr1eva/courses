export type Course = {
    id: string
}

export type CreateCourseResponse = {
    error: null | string,
    course?: Course
}

export interface CreateCourseArgs {
    title: string
}