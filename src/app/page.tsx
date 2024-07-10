// 'use client'

// import type { User } from '@prisma/client'
// import { myFetch } from '@/utils'
import styles from './page.module.scss'
import AuthRequire from '@/app/components/server/AuthRequire'
import { prisma } from '@/lib/collection/mysql'

export default async function Home() {
  const users = await prisma.user.findMany()
  // if is client
  // const [users, setUsers] = useState<User[]>([])
  // useEffect(() => {
  //   myFetch<User[]>('/api/user/users', {}).then((res) => setUsers(res))
  // }, [])
  return (
    <AuthRequire>
      <main className={styles.main}>
        <div>用户列表</div>
        <div>
          {users.map((item) => (
            <div key={item.email}>{item.email}</div>
          ))}
        </div>
      </main>
    </AuthRequire>
  )
}
