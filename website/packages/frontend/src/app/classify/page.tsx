import { auth } from '@/auth'

export default async function ClassifyPage() {
    const session = await auth()
    if (!session?.user) {
        return <h1>Access Denied</h1>
    }
    const userName = session.user.name
    return (
        <>
            <h1>Classify Page</h1>
            {userName ? <p>Welcome, {userName}!</p> : <p>Welcome!</p>}
        </>
    )
}
