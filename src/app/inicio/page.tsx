import { TypographyH3 } from "@/components/ui/typography"
import { currentUser } from "@clerk/nextjs"

export default async function Account() {
    const user = await currentUser()

    if (!user) {
        return null
    }
    return (
        <main className="flex items-center justify-center max-w-screen-2xl mx-auto pt-[10px]">
            <TypographyH3 text={"Bienvenide de vuelta, " + user.firstName + "."} />
        </main>
    )
}