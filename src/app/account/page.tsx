import { currentUser } from "@clerk/nextjs"

export default async function Account() {
    const user = await currentUser()

    if (!user) {
        return null
    }
    return (
        <div>Account</div>
    )
}