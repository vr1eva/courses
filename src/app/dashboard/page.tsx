import { UserButton } from "@clerk/nextjs";

export default function Dashboard() {
    return (
        <div className="h-screen">
            <UserButton />
        </div>
    )
}