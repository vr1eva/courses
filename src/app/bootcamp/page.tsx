import { currentUser } from "@clerk/nextjs"

export default async function Bootcamp() {
    const user = await currentUser()
    if (!user) {
        return null
    }

    return (
        <div>Bootcamp</div>
    )
}