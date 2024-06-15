import { auth } from '@/auth'

export default async function AdminPage() {
    const session = await auth()
    const user = session?.user || {}
    if (!session?.user) {
        return <h1>Access Denied</h1>
    }
    return (
        <>
            <h1>Admin Page</h1>
            {user.name ? <p>Welcome, {user.name}!</p> : <p>Welcome!</p>}
        </>
    )
}
