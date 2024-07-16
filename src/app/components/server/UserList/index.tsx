import styles from './index.module.scss'
import { User } from '@prisma/client'

interface UserListProps {
  users: User[]
}
function UserList({ users }: UserListProps) {
  return (
    <div className={styles.userList}>
      {users.map((user, index) => (
        <div key={index} className={styles.userItem}>
          <span className={styles.userName}>{user.name}</span>
          <span className={styles.userEmail}>{user.email}</span>
        </div>
      ))}
    </div>
  )
}

export default UserList
