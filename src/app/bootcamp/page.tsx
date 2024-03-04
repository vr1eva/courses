import { currentUser } from "@clerk/nextjs"

export default async function Bootcamp() {
    const user = await currentUser()
    if (!user) {
        return null
    }

    return (
        <div className="flex items-center flex-col pt-7">
            <iframe style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }} width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/G7fV8n7wYSHYOFmlTY09TH/cursors?type=whiteboard&node-id=1-4&t=9glg1LTgRP7ly4h1-4" allowFullScreen>
            </iframe>
        </div>
    )
}