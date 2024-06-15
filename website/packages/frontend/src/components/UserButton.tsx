import classes from './UserButton.module.css'
import { User } from 'next-auth'

interface UserButtonProps {
    user: User
}
export const UserButton = ({ user }: UserButtonProps) => {
    return (
        <div>
            {user.image ? (
                <img
                    className={classes.avatarImg}
                    src={user.image}
                    alt={user.name || 'Unknown'}
                />
            ) : null}
            <span>{user.name}</span>
        </div>
    )
}
